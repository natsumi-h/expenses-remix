import { Outlet } from "@remix-run/react";
import marketingStyles from "~/styles/marketing.css";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";
import type {
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: marketingStyles }];
}

export function loader({ request }: LoaderFunctionArgs) {
  return getUserFromSession(request);
}

export const meta: MetaFunction = () => {
  return [
    { title: "Marketing | Remix" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
};

export const headers: HeadersFunction = () => ({
  "Cache-Control": "max-age=3000",
});

