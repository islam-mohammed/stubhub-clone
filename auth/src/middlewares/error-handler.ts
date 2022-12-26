import { NextFunction, Request, Response } from "express";
import IResponse from "../models/response";
import CustomError from "../errors/custom-error";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeError());
  }
  const response: IResponse = {
    status: "Error",
    errors: [
      {
        message: err.message,
      },
    ],
  };
  return res.status(400).json(response);
};

export default errorHandler;
