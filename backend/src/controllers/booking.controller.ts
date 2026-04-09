import { Request, Response } from "express";
import { Booking } from "../models/booking.model";
import { ApiError } from "../utils/ApiError";
import { ApiResonse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Train } from "../models/train.model";

export const getPnrStatus = asyncHandler(async (req: Request, res: Response) => {
  const { pnrNumber } = req.params;

  if (!pnrNumber) {
    throw new ApiError(400, "PNR Number is required");
  }

  // Populate train details so frontend gets a rich PNR response
  const booking = await Booking.findOne({ pnrNumber })
    .populate("train", "trainName trainNumber source destination departureTime arrivalTime route")
    .populate("user", "username email");

  if (!booking) {
    throw new ApiError(404, "Invalid PNR / Booking not found");
  }

  return res.status(200).json(new ApiResonse(200, booking, "PNR status fetched successfully"));
});

export const getMyBookings = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Not authenticated");
  }

  const bookings = await Booking.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("train", "trainName trainNumber source destination departureTime arrivalTime route");

  return res.status(200).json(new ApiResonse(200, bookings, "User bookings fetched successfully"));
});


// Helper route to create a booking quickly if needed
export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const { train, className, passengers, contactEmail, contactPhone, fareBreakdown } = req.body;
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Not authenticated");
  }
  
  if (!train || !className || !passengers || !Array.isArray(passengers) || !contactEmail || !contactPhone || !fareBreakdown) {
     throw new ApiError(400, "Missing required complex booking details (train, className, passengers[], contact, fareBreakdown)");
  }

  // 1. Physically decrement available seats on the exact Train Class safely
  const trainDoc = await Train.findById(train);
  if (!trainDoc) throw new ApiError(404, "Target train for booking not found!");

  const targetClassIndex = trainDoc.classes.findIndex(c => c.className === className);
  if (targetClassIndex === -1) throw new ApiError(400, "Requested train does not host the selected booking class.");

  // Lower the availability natively (we allow it to drop negative to simulate RAC/WL ticketing)
  trainDoc.classes[targetClassIndex].availableSeats -= passengers.length;
  await trainDoc.save();

  // 2. Generate mock 10-digit PNR
  const pnrNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

  // 3. Mock allocating exact berths (e.g., 'B2-24') 
  const bookedPassengers = passengers.map((p: any) => ({
    ...p,
    berthAllocated: `${className.substring(0,1)}${Math.floor(Math.random() * 5 + 1)}-${Math.floor(Math.random() * 72 + 1)}`, // Mock e.g. "32-56" -> "34-12"
    status: trainDoc.classes[targetClassIndex].availableSeats < 0 ? "WL" : "CONFIRMED"
  }));

  // 4. Fire into Database
  const newBooking = await Booking.create({
    user: user._id,
    train,
    pnrNumber,
    className,
    passengers: bookedPassengers,
    contactEmail,
    contactPhone,
    fareBreakdown,
    status: "CONFIRMED"
  });

  return res.status(201).json(new ApiResonse(201, newBooking, "Booking completely confirmed"));
});
