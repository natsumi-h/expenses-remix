import ExpenseStatistics from "../components/expenses/ExpenseStatistics";
import Chart from "../components/expenses/Chart";
import expensesStyles from "~/styles/expenses.css";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import ExpensesHeader from "~/components/navigation/ExpenseHeader";
import { getExpenses } from "~/data/expenses.server";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserSession } from "~/data/auth.server";

export default function Analysis() {
  const expenses = useLoaderData<typeof loader>();
  const hasExpenses = expenses && expenses.length !== 0;


  return (
    <>
      <ExpensesHeader />
      <main>
        {hasExpenses && (
          <>
            <Chart expenses={expenses} />
            <ExpenseStatistics expenses={expenses} />
          </>
        )}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="/expenses/add">adding some</Link> today
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyles },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserSession(request);
  
  return getExpenses(userId);
}
