import IResponse from "../models/response";
import CustomError from "./custom-error";

export default class BadRequestError extends CustomError {
  constructor(
    public message: string,
    public field: string = "",
    public statusCode = 400
  ) {
    super(message);
  }
  serializeError(): IResponse {
    return {
      status: "Error",
      errors: [
        {
          message: this.message,
          field: this.field,
        },
      ],
    };
  }
}
