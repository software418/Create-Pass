import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import * as authService from './auth.service';

export const register = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await authService.registerUser(req.body);

  res.status(201).json({
    status: 'success',
    token,
    data: { user },
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await authService.loginUser(req.body);

  res.status(200).json({
    status: 'success',
    token,
    data: { user },
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  // requires auth middleware to set req.user
  res.status(200).json({
    status: 'success',
    data: { user: (req as any).user },
  });
});
