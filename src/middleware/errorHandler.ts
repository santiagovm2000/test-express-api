import { Request, Response, NextFunction } from "express";

/**
 * Middleware function to handle errors in the application.
 *
 * @param err - The error object containing details about the error.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 *
 * @remarks
 * This middleware captures errors thrown in the application and sends a JSON response
 * with the appropriate HTTP status code, error message, and additional error details if available.
 *
 * @returns void
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || null;

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
