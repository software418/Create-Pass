import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import  AppError  from '../utils/appError';
import { verifyToken } from '../utils/jwt.utils';
import { User } from '../features/users/user.model';

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // 1) Getting token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401,'TOKEN_NOT_PROVIDED'));
  }

  // 2) Verification token
  const decoded: any = verifyToken(token);
  if (!decoded) {
      return next(new AppError('Invalid or expired token.', 401,'TOKEN_EXPIRED'));
  }

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401,'USER_NOT_EXIST'));
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  (req as any).user = currentUser;
  next();
});

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as any).user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403,'FORBIDEN_USER'));
    }
    next();
  };
};
