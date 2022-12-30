import * as Yup from "yup";

const validationMessages = {
  signUp: Yup.object().shape({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("First name is required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must at least contains 8 characters, 1 upper case, 1 lower case, and 1 number"
      )
      .required("Password is required"),
  }),
};

export const clientValidation = {
  validationMessages,
};
