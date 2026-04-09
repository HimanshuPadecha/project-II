import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN as string, "http://localhost:5174"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

import userRouter from "./routes/user.router";
import trainRouter from "./routes/train.router";
import bookingRouter from "./routes/booking.router";
import alertRouter from "./routes/alert.router";
import paymentRouter from "./routes/payment.router";
import adminRouter from "./routes/admin.router";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/trains", trainRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/alerts", alertRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/admin", adminRouter);

export { app };
