import IResponse from "../models/response";
import CustomError from "./custom-error";

export default class BadRequestError extends CustomError {
  constructor(message: string, public statusCode = 400) {
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
