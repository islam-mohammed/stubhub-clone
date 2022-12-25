import IResponse from "../models/response";

export default abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
  }
  abstract serializeError(): IResponse;
}
