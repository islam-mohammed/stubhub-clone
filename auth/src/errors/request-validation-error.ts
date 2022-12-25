import { ValidationError } from "express-validator";
import IError from "../models/error";
import IResponse from "../models/response";
import CustomError from "./custom-error";
export default class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super(errors[0].msg);
  }
  serializeError(): IResponse {
    const errors: IError[] = this.errors.map((err) => ({
      message: err.msg as string,
      field: err.param,
    }));

    return {
      status: "Error",
      errors,
    };
  }
}
