import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";
import Logo from "../util/Logo";
import type { loader } from "~/routes/_app";

function ExpensesHeader() {
  const userId = useLoaderData<typeof loader>();
  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/expenses" end>
              Manage Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        {userId && (
          <Form action="/logout" method="post" id="logout-form">
            <button className="cta-alt">Logout</button>
          </Form>
        )}
        {!userId && (
          <Link to="/auth" className="cta">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default ExpensesHeader;
