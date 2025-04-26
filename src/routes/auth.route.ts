import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { routeHandler } from "../middleware/routeHandler";

const router = Router();

//Public
router.route("/login").post(routeHandler(login));

export default router;
