import IResponse from "../models/response";
import CustomError from "./custom-error";

export default class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Resource not found!");
  }
  serializeError(): IResponse {
    return {
      status: "Error",
      errors: [
        {
          message: "Resource not found!",
        },
      ],
    };
  }
}
