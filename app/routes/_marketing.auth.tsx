import type {
  HeadersFunction,
  LinksFunction,
  DataFunctionArgs,
} from "@remix-run/node";
import authStyles from "~/styles/auth.css";
import AuthForm, { authValidator } from "../components/auth/AuthForm";
import { login, signup } from "~/data/auth.server";
import { validationError } from "remix-validated-form";

export default function auth() {
  return <AuthForm />;
}

export const action = async ({ request }: DataFunctionArgs) => {
  const result = await authValidator.validate(await request.formData());
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  if (result.error) {
    return validationError(result.error);
  }

  const { password, email } = result.data;
  if (password && email) {
    try {
      if (authMode === "login") {
        return login({ password, email });
      } else {
        return signup({ password, email });
      }
    } catch (error) {
      return error;
    }
  }
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];

export const headers: HeadersFunction = ({ parentHeaders }) => ({
  "Cache-Control": parentHeaders.get("Cache-Control") as string,
});

export function ErrorBoundary() {
  return <AuthForm />;
}
