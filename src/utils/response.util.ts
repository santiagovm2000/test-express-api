import { Response } from "express";

/**
 * Sends a success response to the client.
 *
 * @template T - The type of the data being sent in the response.
 * @param res - The HTTP response object.
 * @param data - The data to include in the response.
 * @param message - A message describing the success (default: "Success").
 * @param statusCode - The HTTP status code for the response (default: 200).
 */
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

/**
 * Sends an error response to the client.
 *
 * @param res - The HTTP response object.
 * @param message - A message describing the error (default: "Internal Server Error").
 * @param statusCode - The HTTP status code for the response (default: 500).
 * @param errors - Additional error details to include in the response (optional).
 */
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
