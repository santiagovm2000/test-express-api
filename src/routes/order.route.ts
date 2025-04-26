import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
} from "../controllers/order.controller";
import { routeHandler } from "../middleware/routeHandler";
import { authenticateJWT } from "../middleware/authHandler";

const router = Router();

// All routes protected
router.use(authenticateJWT);

router
  .route("/")
  .post(routeHandler(createOrder))
  .get(authenticateJWT, routeHandler(getOrders));

router
  .route("/:id")
  .get(authenticateJWT, routeHandler(getOrderById))
  .patch(authenticateJWT, routeHandler(updateOrder))
  .delete(authenticateJWT, routeHandler(deleteOrder));

router
  .route("/from/:userId")
  .get(authenticateJWT, routeHandler(getOrdersByUserId));

export default router;
