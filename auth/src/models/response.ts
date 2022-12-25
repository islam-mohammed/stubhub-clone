import IError from "./error";

export default interface IResponse {
  status: "Error" | "Success";
  message?: string;
  errors?: IError[];
}
