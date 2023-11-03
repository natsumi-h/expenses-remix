import { FaLock, FaUserPlus } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { useRouteError } from "@remix-run/react";
import { ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { AuthInput } from "./AuthInput";
import { AuthSubmitButton } from "./AuthSubmitButton";

export const authValidator = withZod(
  z.object({
    password: z
      .string()
      .min(7, { message: "Password must be at least 7 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
  })
);

function AuthForm() {
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get("mode") || "login";

  const authError: any = useRouteError();
  const authErrorData = authError?.data;

  const submitBtnCaption = authMode === "login" ? "Login" : "Create User";
  const toggleBtnCaption =
    authMode === "login" ? "Create a new user" : "Login with existing user";

  return (
    <ValidatedForm
      validator={authValidator}
      method="post"
      className="form"
      id="auth-form"
    >
      <div className="icon-img">
        {authMode === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <AuthInput name="email" label="Email Address" />
      <AuthInput name="password" label="Password" />
      {authErrorData && <p>{authErrorData}</p>}
      <div className="form-actions">
        <AuthSubmitButton submitBtnCaption={submitBtnCaption} />
        <Link to={authMode === "login" ? "?mode=signup" : "?mode=login"}>
          {toggleBtnCaption}
        </Link>
      </div>
    </ValidatedForm>
  );
}

export default AuthForm;
