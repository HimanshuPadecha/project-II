import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { jwtPayload } from "../middlewares/auth.middleware";
import { param, validationResult } from "express-validator";
import { NextFunction, Request ,Response } from "express";
import { ApiError } from "./ApiError";
import { asyncHandler } from "./asyncHandler";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const isPasswordCorrect = async (
  unhashedPass: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(
    unhashedPass,
    hashedPassword,
  );
};

export const generateAccessToken = async (username: string) => {
  const options: SignOptions = {
    expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRY) || "1d",
  };

  const payload: jwtPayload = {
    username,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, options);
};


export const uuidValidator = (paramName : string) => {
  // console.log(paramName);
  
  return [
    param(paramName).isUUID().notEmpty().withMessage(`Invalid ${paramName}`)
  ]
}

export const validator = asyncHandler( async (req: Request, _ : Response , next : NextFunction) => {
  const errors = validationResult(req)
  // console.log("anotheruserid",req.params.id);
  

  if(errors.isEmpty()){
    // logger.info("The errors are empty")    
    return next()
  }
  // logger.info(errors)

  const extrectedErrors : any= []
  errors.array().map((error) => extrectedErrors.push({[error.type] : error.msg}))

  throw new ApiError(404,"Error while validation",extrectedErrors)
})
