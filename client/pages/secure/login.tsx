import { useState } from "react";
import SigninForm from "../../components/forms/signin-form";
import SignupForm from "../../components/forms/signup-form";

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
