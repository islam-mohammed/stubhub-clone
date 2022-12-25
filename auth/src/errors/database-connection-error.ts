import IResponse from "../models/response";
import CustomError from "./custom-error";

export default class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  constructor(public error: Error) {
    super(error.message);
  }
  serializeError(): IResponse {
    return {
      status: "Error",
      errors: [
        {
          message: this.error.message,
          stack: this.error.stack,
        },
      ],
    };
  }
}
