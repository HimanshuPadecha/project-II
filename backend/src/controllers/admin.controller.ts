import { Request, Response } from "express";
import { Admin } from "../models/admin.model";
import { User } from "../models/user.model";
import { Booking } from "../models/booking.model";
import { Train } from "../models/train.model";
import { ApiError } from "../utils/ApiError";
import { ApiResonse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { hashPassword, isPasswordCorrect } from "../utils/utils";
import { options, signupSchema } from "../types";
import jwt, { SignOptions } from "jsonwebtoken";

// Local helper to ensure token is absolutely targeted for admins
const generateAdminAccessToken = (username: string) => {
  const signOptions: SignOptions = {
    expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRY) || "1d",
  };
  return jwt.sign({ username, role: 'admin' }, process.env.ACCESS_TOKEN_SECRET as string, signOptions);
};

export const adminSignup = asyncHandler(async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(400, "Please provide proper username and password");
  }

  const { username, password } = result.data;
  const alreadyExist = await Admin.findOne({ username });

  if (alreadyExist) {
    throw new ApiError(401, "Admin username already exists");
  }

  const hashedPassword = await hashPassword(password);

  const admin = await Admin.create({
    password: hashedPassword,
    username,
    email: req.body.email || `${username}@admin.com`,
  });

  return res.status(201).json(new ApiResonse(201, admin, "Admin created successfully"));
});

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(400, "Invalid credentials format");
  }

  const { username, password } = result.data;
  const admin = await Admin.findOne({ username });

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const passwordCorrect = await isPasswordCorrect(password, admin.password);
  if (!passwordCorrect) {
    throw new ApiError(401, "The password is incorrect");
  }

  const accessToken = generateAdminAccessToken(username);

  return res
    .status(200)
    .cookie("adminAccessToken", accessToken, options)
    .json(new ApiResonse(200, { accessToken, admin }, "Admin logged in successfully"));
});

export const adminLogout = asyncHandler(async (req: Request, res: Response) => {
  return res
    .status(200)
    .clearCookie("adminAccessToken", options)
    .json(new ApiResonse(200, null, "Admin logged out"));
});

// --- Management Endpoints ---

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select("-password");
  return res.status(200).json(new ApiResonse(200, users, "Users fetched successfully"));
});

export const getAllBookings = asyncHandler(async (req: Request, res: Response) => {
  // Populate the associated user and train explicitly
  const bookings = await Booking.find().populate("user", "username email").populate("train", "trainNumber trainName source destination");
  return res.status(200).json(new ApiResonse(200, bookings, "Bookings fetched successfully"));
});

export const getAllTrains = asyncHandler(async (req: Request, res: Response) => {
  const trains = await Train.find();
  return res.status(200).json(new ApiResonse(200, trains, "Trains fetched successfully"));
});

export const addTrain = asyncHandler(async (req: Request, res: Response) => {
  const { trainNumber, trainName, source, destination, departureTime, arrivalTime, daysOfOperation, trainType, classes, stops } = req.body;
  
  const existingTrain = await Train.findOne({ trainNumber });
  if (existingTrain) {
    throw new ApiError(400, "Train already exists with this number");
  }

  const newTrain = await Train.create({
    trainNumber,
    trainName,
    source,
    destination,
    departureTime,
    arrivalTime,
    daysOfOperation,
    trainType,
    classes,
    stops
  });

  return res.status(201).json(new ApiResonse(201, newTrain, "Train created successfully"));
});

export const updateTrain = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTrain = await Train.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedTrain) {
    throw new ApiError(404, "Train not found");
  }

  return res.status(200).json(new ApiResonse(200, updatedTrain, "Train updated successfully"));
});

export const deleteTrain = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTrain = await Train.findByIdAndDelete(id);

  if (!deletedTrain) {
    throw new ApiError(404, "Train not found");
  }

  return res.status(200).json(new ApiResonse(200, null, "Train deleted successfully"));
});
