import IResponse from "../models/response";
import CustomError from "./custom-error";

export default class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  constructor() {
    super("Error connecting to the database!");
  }
  serializeError(): IResponse {
    return {
      status: "Error",
      errors: [
        {
          message: "Error connecting to the database!",
        },
      ],
    };
  }
}
