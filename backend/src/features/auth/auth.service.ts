import { User } from '../users/user.model';
import { AppError } from '../../utils/appError';
import { signToken } from '../../utils/jwt.utils';

export const registerUser = async (data: any) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError('Email already exists', 400);
  }

  const newUser = await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  const token = signToken(newUser.id);
  newUser.password = undefined as any;

  return { user: newUser, token };
};

export const loginUser = async (data: any) => {
  const user = await User.findOne({ email: data.email }).select('+password');
  
  if (!user || !(await (user as any).correctPassword(data.password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  const token = signToken(user.id);
  user.password = undefined as any;

  return { user, token };
};
