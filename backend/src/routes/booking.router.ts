import express from "express";
import { getPnrStatus, createBooking } from "../controllers/booking.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/pnr/:pnrNumber", getPnrStatus);
router.post("/", authMiddleware, createBooking);

export default router;
