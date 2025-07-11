import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Mongoose ValidationError
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: err.name,
        errors: err.errors,
      },
    });
    return;
  }

  // Other errors
  res.status(500).json({
    message: 'Something went wrong',
    success: false,
    error: err.message || err,
  });
};
