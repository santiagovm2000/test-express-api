import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { routeHandler } from "../middleware/routeHandler";
import { authenticateJWT } from "../middleware/authHandler";

const router = Router();

// All routes protected
router.use(authenticateJWT);

router
  .route("/")
  .get(routeHandler(getProducts))
  .post(routeHandler(createProduct));

router
  .route("/:id")
  .get(routeHandler(getProductById))
  .patch(routeHandler(updateProduct))
  .delete(routeHandler(deleteProduct));

export default router;
