import express from "express";
import {
  searchTrains,
  getLiveStatus,
  searchStations
} from "../controllers/train.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = express.Router();

router.post("/search", upload.none(), searchTrains);
router.get("/stations", searchStations);
router.get("/live/:trainNumber", getLiveStatus);

export default router;
