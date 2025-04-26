import { Request, Response } from "express";
import userService from "../services/user.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.util";
import bcrypt from "bcrypt";

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

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await userService.get(req);
  sendSuccessResponse(res, users, "Users retrieved successfully");
};

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
