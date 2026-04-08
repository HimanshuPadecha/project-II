import express from "express";
import { ApiResonse } from "../utils/apiResponse";

const router = express.Router();

router.get("/", (req, res) => {
  // Static mock response for news alerts
  const defaultAlert = {
    id: "alert-holiday-1",
    message: "Special Winter Holiday trains announced for New Delhi - Shimla route. Bookings open tomorrow 8:00 AM.",
    type: "INFO",
    active: true
  };

  res.status(200).json(new ApiResonse(200, [defaultAlert], "Alerts fetched"));
});

export default router;
