// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendErrorResponse } from "../utils/response.util";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authenticateJWT: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    sendErrorResponse(res, "Token not provided", 401);
    return;
  }

  const token = authHeader.split(" ")[1];
  let decoded: string | JwtPayload;
  try {
    decoded = jwt.verify(token, JWT_SECRET!);
  } catch {
    sendErrorResponse(res, "Invalid or expired token", 403);
    return;
  }

  const payload = typeof decoded === "string" ? {} : decoded;
  if (typeof payload.sub !== "string") {
    sendErrorResponse(res, "Invalid token payload", 403);
    return;
  }

  req.user = { id: payload.sub };
  next();
};
