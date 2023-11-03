import type { ActionFunctionArgs } from "@remix-run/node";
import { logout } from "~/data/auth.server";

export function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw new Error("Method not allowed");
  }

  return logout(request);
}
