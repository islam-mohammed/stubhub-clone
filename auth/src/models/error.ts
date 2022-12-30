export default interface IError {
  message: string;
  field?: string;
  stack?: string | undefined;
}
