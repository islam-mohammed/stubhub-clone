export default interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  isUserLoading?: boolean;
  isError?: boolean;
}
