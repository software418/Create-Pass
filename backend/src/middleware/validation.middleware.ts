import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AppError } from '../utils/appError';

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = (error as any).errors.map((issue: any) => `${issue.path.join('.')} is ${issue.message}`);
        return next(new AppError(`Validation Error: ${errorMessages.join(', ')}`, 400));
      }
      return next(new AppError('Internal Server Error', 500));
    }
  };
};
