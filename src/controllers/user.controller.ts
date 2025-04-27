import { Request, Response } from "express";
import userService from "../services/user.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.util";
import bcrypt from "bcrypt";

/**
 * Creates a new user.
 *
 * @param req - The HTTP request object containing the user details in the body.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response with the created user.
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { username, name, password, email } = req.body;

  password = await bcrypt.hash(password, 10);

  const newUser = await userService.create({
    username,
    name,
    password,
    email,
  });
  sendSuccessResponse(res, newUser, "User created successfully", 201);
};

/**
 * Retrieves a list of users.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response with the list of users.
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await userService.get(req);
  sendSuccessResponse(res, users, "Users retrieved successfully");
};

/**
 * Retrieves a user by their ID.
 *
 * @param req - The HTTP request object containing the user ID in the route parameters.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response with the user data if found,
 *          or an error response if the user is not found.
 */
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await userService.getById(req.params.id);
  if (!user) {
    sendErrorResponse(res, "User not found", 404);
    return;
  }
  sendSuccessResponse(res, user, "User retrieved successfully");
};

/**
 * Updates an existing user by their ID.
 *
 * @param req - The HTTP request object containing the user ID in the route parameters
 *              and the updated user data in the body.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response with the updated user data
 *          if the update is successful, or an error response if the user is not found.
 */
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const updatedUser = await userService.update(req.params.id, req.body);
  if (!updatedUser) {
    sendErrorResponse(res, "User not found", 404);
    return;
  }
  sendSuccessResponse(res, updatedUser, "User updated successfully");
};

/**
 * Deletes a user by their ID.
 *
 * @param req - The HTTP request object containing the user ID in the route parameters.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response if the user is deleted successfully,
 *          or an error response if the user is not found.
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const deletedUser = await userService.delete(req.params.id);
  if (!deletedUser) {
    sendErrorResponse(res, "User not found", 404);
    return;
  }
  sendSuccessResponse(res, deletedUser, "User deleted successfully");
};

/**
 * Inactivates a user by their ID.
 *
 * @param req - The HTTP request object containing the user ID in the route parameters.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response if the user is inactivated successfully,
 *          or an error response if the user is not found.
 */
export const inactivateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const inactivatedUser = await userService.inactivate(req.params.id);
  if (!inactivatedUser) {
    sendErrorResponse(res, "User not found", 404);
    return;
  }
  sendSuccessResponse(res, inactivatedUser, "User inactivated successfully");
};

/**
 * Activates a user by their ID.
 *
 * @param req - The HTTP request object containing the user ID in the route parameters.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response if the user is activated successfully,
 *          or an error response if the user is not found.
 */
export const activateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const activatedUser = await userService.activate(req.params.id);
  if (!activatedUser) {
    sendErrorResponse(res, "User not found", 404);
    return;
  }
  sendSuccessResponse(res, activatedUser, "User activated successfully");
};
