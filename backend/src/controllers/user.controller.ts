import { Request, Response } from "express";
import { options, signupSchema } from "../types";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import {
  generateAccessToken,
  hashPassword,
  isPasswordCorrect,
} from "../utils/utils";
import { User } from "../models/user.model";
import { ApiResonse } from "../utils/apiResponse";
import { uploadToCloudinary } from "../utils/cloudinary";

export const signup = asyncHandler(async (req: Request, res: Response) => {

  console.log(req.body.username);
  console.log(req.body.password);
  
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(400, "Please provide proper username and passwords");
  }

  const { data: body } = result;

  const alreadyExist = await User.findOne({ username: body.username });

  if (alreadyExist) {
    throw new ApiError(401, "This username already exist");
  }

  let profileImg = "";
  if (req.file) {
    const response = await uploadToCloudinary(req.file.path);
    if (!response) {
      throw new ApiError(500, "Internal Server Error uploading image");
    }
    profileImg = response.uploadedImgUrl;
  }

  const hashedPassword = await hashPassword(body.password);

  const user = await User.create({
    password: hashedPassword,
    username: body.username,
    email: req.body.email || `${body.username}@test.com`, // email mock if not provided
    profileImg,
    recentSearches: [],
  });

  return res.status(200).json(new ApiResonse(200, user, "signed up"));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(400, `${result.error}`);
  }

  const { data: body } = result;
  const { username, password } = body;

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const passwordCorrect = await isPasswordCorrect(password, user.password);

  if (!passwordCorrect) {
    throw new ApiError(401, "The password is incorrect");
  }

  const accessToken = await generateAccessToken(username);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResonse(200, { accessToken, user }, "Logged in successfully"));
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResonse(200, null, "logged out"));
});

export const getRecentSearches = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) {
    throw new ApiError(404, "Not logged in");
  }

  return res
    .status(200)
    .json(new ApiResonse(200, user.recentSearches, "Recent searches fetched"));
});

export const addRecentSearch = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req;
  const { source, destination, date } = req.body;

  if (!user) {
    throw new ApiError(404, "Not logged in");
  }
  if (!source || !destination || !date) {
    throw new ApiError(400, "Missing required search parameters");
  }

  const newSearch = { source, destination, date: new Date(date) };

  const dbUser = await User.findById(user._id);
  if (!dbUser) {
    throw new ApiError(404, "User not found");
  }

  dbUser.recentSearches.unshift(newSearch);
  
  // Keep only the latest 10 searches to prevent huge array
  if (dbUser.recentSearches.length > 10) {
    dbUser.recentSearches.pop();
  }

  await dbUser.save();

  return res
    .status(200)
    .json(new ApiResonse(200, dbUser.recentSearches, "Recent search added to history"));
});

export const getSavedPassengers = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) throw new ApiError(404, "Not logged in");

  return res.status(200).json(new ApiResonse(200, user.savedPassengers || [], "Saved passengers fetched"));
});

export const addSavedPassenger = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req;
  const { fullName, age, gender, berthPreference } = req.body;

  if (!user) throw new ApiError(404, "Not logged in");
  
  if (!fullName || !age || !gender) {
    throw new ApiError(400, "Missing required passenger details (fullName, age, gender)");
  }

  const dbUser = await User.findById(user._id);
  if (!dbUser) throw new ApiError(404, "User not found");

  dbUser.savedPassengers.push({ fullName, age, gender, berthPreference });
  await dbUser.save();

  return res.status(201).json(new ApiResonse(201, dbUser.savedPassengers, "Passenger saved effectively"));
});

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) {
    throw new ApiError(401, "Not logged in");
  }

  return res.status(200).json(new ApiResonse(200, user, "Current user fetched"));
});

export const updateProfileImage = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) throw new ApiError(401, "Not logged in");

  if (!req.file) {
    throw new ApiError(400, "Please provide an image file");
  }

  const response = await uploadToCloudinary(req.file.path);
  if (!response) {
    throw new ApiError(500, "Internal Server Error uploading image");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { profileImg: response.uploadedImgUrl },
    { new: true, select: "-password" } // Do not return password hash
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResonse(200, updatedUser, "Profile image updated successfully"));
});
