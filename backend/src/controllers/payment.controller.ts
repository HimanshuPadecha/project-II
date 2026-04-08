import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResonse } from "../utils/apiResponse";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { amount, currency = "INR" } = req.body;

  if (!amount) {
    throw new ApiError(400, "Amount is required to create a payment order");
  }

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency,
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    if (!order) {
      throw new ApiError(500, "Failed to create Razorpay order");
    }

    return res.status(200).json(new ApiResonse(200, order, "Order created successfully"));
  } catch (error: any) {
    throw new ApiError(500, error.message || "Error creating Razorpay order");
  }
});

export const verifyPayment = asyncHandler(async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError(400, "Missing required Razorpay payment details");
  }

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    throw new ApiError(400, "Payment verification failed: Invalid signature");
  }

  return res.status(200).json(new ApiResonse(200, { verified: true }, "Payment verified successfully"));
});
