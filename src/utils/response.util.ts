import { Response } from "express";

export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendErrorResponse = (
  res: Response,
  message = "Internal Server Error",
  statusCode = 500,
  errors?: any
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
