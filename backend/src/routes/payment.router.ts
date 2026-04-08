import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// To create an order, user must be authenticated
router.use(authMiddleware);

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

export default router;
