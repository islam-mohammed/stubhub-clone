import { GetServerSideProps } from "next";
import { useState } from "react";
import SigninForm from "../../components/forms/signin-form";
import SignupForm from "../../components/forms/signup-form";
import axiosServer from "../../helpers/axios.helper";
import User from "../../models/user";

const Login = () => {
  const [formType, setFormType] = useState<"signin" | "signup" | "forget">(
    "signin"
  );
  return (
    <div className="flex justify-center min-h-screen items-center sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow  sm:rounded-lg sm:px-4">
        {formType === "signup" && (
          <SignupForm toggleForm={() => setFormType("signin")} />
        )}
        {formType === "signin" && (
          <SigninForm toggleForm={() => setFormType("signup")} />
        )}
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data: user } = await axiosServer(req).get("/api/users/current");

  if (user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
