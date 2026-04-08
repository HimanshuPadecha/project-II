import { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError";

export function asyncHandler(fn: Function) {

  return (req: Request, res: Response, next: NextFunction) => {
    
    Promise.resolve(fn(req, res, next)).catch((error) => {
      if (!(error instanceof ApiError)) {
        return res.status(500).json({
          message: "Unexpected Error",
        });
      } else {
        return res.status(error.statusCode).json({
          message: error.message,
          success: error.success,
          data: null,
        });
      }
    });
  };
}
