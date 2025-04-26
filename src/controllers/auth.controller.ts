// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import authService from "../services/auth.service";
import { sendSuccessResponse } from "../utils/response.util";

/**
 * Handles the login process for a user.
 *
 * @param req - The HTTP request object containing the user's credentials in the body.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A Promise that resolves to void.
 *
 * The function extracts the `username` and `password` from the request body,
 * calls the `authService.login` method to authenticate the user and generate
 * a token, and sends a success response with the token.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const { token, expiresInMinutes } = await authService.login(
    username,
    password
  );
  sendSuccessResponse(res, { token, expiresInMinutes }, "Login successful");
};
