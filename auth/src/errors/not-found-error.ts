import IResponse from "../models/response";
import CustomError from "./custom-error";

export default class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(message: string = "Resource not found!") {
    super(message);
  }
  serializeError(): IResponse {
    return {
      status: "Error",
      errors: [
        {
          message: this.message,
        },
      ],
    };
  }
}
