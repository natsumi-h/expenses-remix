import type { LoaderFunctionArgs, HeadersFunction } from "@remix-run/node";
import { Link, useSearchParams } from "@remix-run/react";
import { requireUserSession } from "~/data/auth.server";
import { updateUsersPlan } from "~/data/checkout.server";

export default function ThanksPage() {
  const [searchParams] = useSearchParams();
  const paymentResult = searchParams.get("session_id");
  return (
    <main id="pricing">
      <p>thanks! {paymentResult !== null && "Payment completed!"}</p>
      <p>
        Back to <Link to="/expeses">home</Link>
      </p>
    </main>
  );
}

export function meta() {}

export const headers: HeadersFunction = ({ parentHeaders }) => ({
  "Cache-Control": parentHeaders.get("Cache-Control") as string,
});

export const handle = {
  disableJs: true,
};

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserSession(request);
  // return userId;
  return updateUsersPlan(userId);
}
