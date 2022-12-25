export default interface IError {
  message: string;
  filed?: string;
  stack?: string | undefined;
}
