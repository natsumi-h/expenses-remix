import {
  json,
  type HeadersFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesLayout() {
  const expenses = useLoaderData<typeof loader>();
  const hasExpenses = expenses && expenses.length !== 0;

  return (
    <main>
      <section id="expenses-actions">
        <Link to="add">
          <FaPlus />
          <span>Add Expense</span>
        </Link>
        <a href="/expenses/raw">
          <FaDownload />
          <span>Load Raw Data</span>
        </a>
      </section>

      {hasExpenses && <ExpensesList expenses={expenses} />}
      {!hasExpenses && (
        <section id="no-expenses">
          <h1>No expenses found</h1>
          <p>
            Start <Link to="add">adding some</Link> today
          </p>
        </section>
      )}
      <Outlet />
    </main>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  return json(expenses, {
    headers: {
      "Cache-Control": "max-age=3",
    },
  });
}

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") as string,
});
