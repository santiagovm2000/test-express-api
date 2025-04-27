// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendErrorResponse } from "../utils/response.util";

/**
 * Extends the Express Request object to include a user property.
 */
export interface AuthRequest extends Request {
  user?: { id: string };
}

/**
 * Middleware to authenticate requests using a JWT token.
 *
 * @param req - The HTTP request object, extended to include a user property if authentication is successful.
 * @param res - The HTTP response object used to send error responses if authentication fails.
 * @param next - The next middleware function in the Express pipeline.
 * @returns Calls the next middleware if authentication is successful, or sends an error response if it fails.
 */
export const authenticateJWT: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  // Check if the Authorization header is present and starts with "Bearer "
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    sendErrorResponse(res, "Token not provided", 401);
    return;
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];
  let decoded: string | JwtPayload;

  // Verify the token
  try {
    decoded = jwt.verify(token, JWT_SECRET!);
  } catch {
    sendErrorResponse(res, "Invalid or expired token", 403);
    return;
  }

  // Validate the token payload
  const payload = typeof decoded === "string" ? {} : decoded;
  if (typeof payload.sub !== "string") {
    sendErrorResponse(res, "Invalid token payload", 403);
    return;
  }

  // Attach the user ID to the request object
  req.user = { id: payload.sub };
  next();
};
