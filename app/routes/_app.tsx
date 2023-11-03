import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";
import ExpenseHeader from "~/components/navigation/ExpenseHeader";
import { getUserFromSession } from "~/data/auth.server";

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpenseHeader />
      <Outlet />
    </>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyles },
];

export function loader({ request }: LoaderFunctionArgs) {
  return getUserFromSession(request);
}

export const meta: MetaFunction = () => {
  return [
    { title: "Expenses | Remix" },
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

