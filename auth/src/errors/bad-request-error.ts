import IResponse from "../models/response";
import CustomError from "./custom-error";

export default class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(message: string) {
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
