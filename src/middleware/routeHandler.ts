import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * A higher-order function that wraps an Express request handler to handle
 * asynchronous errors. It ensures that any errors thrown in the wrapped
 * handler are passed to the `next` middleware function for proper error handling.
 *
 * @param fn - The asynchronous request handler to be wrapped.
 * @returns A new request handler that wraps the provided handler and catches any errors.
 *
 */
export const routeHandler = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
