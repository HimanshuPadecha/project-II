import { ApiError } from "../utils/ApiError";
import { CookieOptions, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model";
import { asyncHandler } from "../utils/asyncHandler";

export interface adminJwtPayload {
  username: string;
}

export const adminAuthMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.adminAccessToken ||
      req.header("Authorization")?.replace("bearer ", "");

    if (token === undefined) {
      throw new ApiError(404, "No admin token found");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET! // Using same secret or maybe a different one, sticking to this for now
    ) as adminJwtPayload;

    const { username } = decodedToken;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      throw new ApiError(404, "Admin not found on this token");
    }

    req.admin = admin;
    next();
  }
);
