import { TextInput, Button, Spinner } from "flowbite-react";
import classNames from "../../helpers/class-names.helper";
import { MailIcon, LockClosedIcon } from "@heroicons/react/solid";
import LoginHeader from "./login-header";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Login from "../../models/login";
import { clientValidation } from "../../helpers/client-validation.helper";
import getSWRCacheKey from "../../helpers/swr.helper";
import { useSWRConfig } from "swr";
import { userServcie } from "../../services/user.service";
import { useRouter } from "next/router";
import { Error } from "../../models/error";

interface PageProps {
  toggleForm: () => void;
}

const SigninForm = ({ toggleForm }: PageProps) => {
  const validationSchema = clientValidation.validationMessages.signIn;
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setError } =
    useForm<Login>(formOptions);
  const { errors } = formState;
  const { mutate } = useSWRConfig();
  const router = useRouter();

  async function onSubmit(user: Login) {
    try {
      const result = await userServcie.signIn(user);
      mutate(getSWRCacheKey().user, result);
      router.push("/");
    } catch (e: any) {
      e.errors.forEach((error: Error) => {
        if (error.field) {
          setError(
            error.field,
            { message: error.message },
            { shouldFocus: true }
          );
        } else {
          setError("email", { message: error.message }, { shouldFocus: true });
        }
      });
    }
  }

  return (
    <>
      <LoginHeader title="Sign in to StubHub" />
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="flex justify-end">
          <a>Forget Password</a>
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
            Sign in
          </Button>
          <p className="text-center mt-1 text-primary leading-4">
            By signing in or creating an account, you acknowledge and accept our
            privacy policy
          </p>
        </div>
        <div>
          <p className="text-center text-lg">
            New to StubHub?{" "}
            <a className="cursor-pointer text-secondary" onClick={toggleForm}>
              Sign up
            </a>
          </p>
        </div>
      </form>
    </>
  );
};
export default SigninForm;
