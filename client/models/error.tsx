export interface Error {
  message: string;
  field?: any;
  stack?: string | undefined;
}

export default interface Errors {
  errors: Error[];
}
