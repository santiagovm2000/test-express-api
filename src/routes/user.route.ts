import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  inactivateUser,
} from "../controllers/user.controller";
import { routeHandler } from "../middleware/routeHandler";
import { authenticateJWT } from "../middleware/authHandler";

const router = Router();

router
  .route("/")
  // Public
  .post(routeHandler(createUser))
  // Protected
  .get(authenticateJWT, routeHandler(getUsers));

router
  .route("/:id")
  // Protected
  .get(authenticateJWT, routeHandler(getUserById))
  // Protected
  .patch(authenticateJWT, routeHandler(updateUser))
  // Protected
  .delete(authenticateJWT, routeHandler(deleteUser));

router
  .route("/inactivate/:id")
  // Protected
  .post(authenticateJWT, routeHandler(inactivateUser));

export default router;
