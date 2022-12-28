import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import User from "../../models/user";
import * as Yup from "yup";
import { TextInput, Button, Spinner } from "flowbite-react";
import classNames from "../../helpers/class-names.helper";
import { MailIcon, LockClosedIcon } from "@heroicons/react/solid";

import LoginHeader from "./login-header";
import { userServcie } from "../../services/user.service";
import Errors from "../../models/error";

const initialValues: User = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};

interface PageProps {
  toggleForm: () => void;
}

const SignupForm = ({ toggleForm }: PageProps) => {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/signup`;

  const validationSchema = Yup.object().shape({
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
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } =
    useForm<User>(formOptions);
  const { errors } = formState;

  async function onSubmit(user: User) {
    try {
      const result = await userServcie.signUp(url, user);
    } catch (e) {
      setError(
        "email",
        { message: "This email in use!", type: "focus" },
        { shouldFocus: true }
      );
    }
  }

  return (
    <>
      <LoginHeader title="Create Account" />
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 md:gap-2">
          <div className="relative z-0  w-full group">
            <TextInput
              type="text"
              placeholder="First name"
              sizing="lg"
              {...register("firstName")}
              shadow={true}
              className={classNames(
                errors.firstName
                  ? "border-danger border border-solid rounded-lg"
                  : ""
              )}
            />
            {errors.firstName ? (
              <div className="text-danger">{errors.firstName.message}</div>
            ) : null}
          </div>
          <div className="relative z-0  w-full group">
            <TextInput
              type="text"
              sizing="lg"
              placeholder="Last name"
              {...register("lastName")}
              shadow={true}
              className={classNames(
                errors.lastName
                  ? "border-danger border border-solid rounded-lg"
                  : ""
              )}
            />
            {errors.lastName && (
              <div className="text-danger">{errors.lastName.message}</div>
            )}
          </div>
        </div>
        <div>
          <TextInput
            type="email"
            icon={MailIcon}
            sizing="lg"
            placeholder="Email"
            {...register("email")}
            shadow={true}
            className={classNames(
              errors.email ? "border-danger border border-solid rounded-lg" : ""
            )}
          />
          {errors.email ? (
            <div className="text-danger">{errors.email.message}</div>
          ) : null}
        </div>
        <div>
          <TextInput
            type="password"
            icon={LockClosedIcon}
            sizing="lg"
            placeholder="password"
            {...register("password")}
            shadow={true}
            className={classNames(
              errors.password
                ? "border-danger border border-solid rounded-lg"
                : ""
            )}
          />
          {errors.password ? (
            <div className="text-danger">{errors.password.message}</div>
          ) : null}
        </div>
        <div className="w-full">
          <Button
            size="lg"
            type="submit"
            className="bg-primary hover:bg-primaryTint w-full"
          >
            {formState.isSubmitting && (
              <div className="mr-3">
                <Spinner size="sm" light={true} />
              </div>
            )}
            Sign up
          </Button>
          <p className="text-center mt-1 text-primary leading-4">
            By signing in or creating an account, you acknowledge and accept our
            privacy policy
          </p>
        </div>
        <div>
          <p className="text-center text-lg">
            Have a StubHub account?{" "}
            <a className="cursor-pointer text-secondary" onClick={toggleForm}>
              Sign in
            </a>
          </p>
        </div>
      </form>
    </>
  );
};
export default SignupForm;
