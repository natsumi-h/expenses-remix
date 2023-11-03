import type { ActionFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";
import { checkout } from "~/data/checkout.server";

export async function action({ request }: ActionFunctionArgs) {
  await requireUserSession(request);
  if (request.method !== "POST") {
    throw new Error("Method not allowed");
  }

  return checkout();
}
