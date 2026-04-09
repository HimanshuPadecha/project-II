import express from "express";
import {
  adminSignup,
  adminLogin,
  adminLogout,
  getAllUsers,
  getAllBookings,
  getAllTrains,
  addTrain,
  updateTrain,
  deleteTrain
} from "../controllers/admin.controller";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware";

const router = express.Router();

// Public Admin Auth Routes
router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

// Protected Admin Management Routes
router.use(adminAuthMiddleware); // Applies to all routes below

// Users
router.get("/users", getAllUsers);

// Bookings
router.get("/bookings", getAllBookings);

// Trains
router.get("/trains", getAllTrains);
router.post("/train", addTrain);
router.put("/train/:id", updateTrain);
router.delete("/train/:id", deleteTrain);

export default router;
