import { Link, useActionData, useMatches, useParams } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import type { action } from "~/routes/_app.expenses.add";
import { ValidatedForm } from "remix-validated-form";
import { ExpenseSubmitButton } from "./ExpenseSubmitButton";
import { ExpenseInput } from "./ExpenseInput";

export const expenseValidator = withZod(
  z.object({
    title: z.string().min(1, { message: "Title is required" }),
    amount: z.string().min(1, { message: "Amount is required" }),
    date: z.string().min(1, { message: "Date is required" }),
  })
);

function ExpenseForm() {
  const validationErrors: any = useActionData<typeof action>();
  const matches: any = useMatches();
  const expenses = matches.find(
    (match: any) => match.id === "routes/_app.expenses"
  ).data;
  const params = useParams();
  type Expense = {
    id: string;
    title: string;
    amount: number;
    date: string;
  };
  const expenseData = expenses.find(
    (expense: Expense) => expense.id === params.id
  );

  if (params.id && !expenseData) {
    return <p>Invalid expense id.</p>;
  }

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  return (
    <ValidatedForm
      validator={expenseValidator}
      method="post"
      className="form"
      id="expense-form"
    >
      <ExpenseInput
        name="title"
        label="Expense Title"
        defaultValues={defaultValues.title}
      />

      <div className="form-row">
        <ExpenseInput
          name="amount"
          label="Amount"
          defaultValues={defaultValues.amount}
        />
        <ExpenseInput
          name="date"
          label="Date"
          defaultValues={defaultValues.date}
        />
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error: any) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <ExpenseSubmitButton />
        <Link to="..">Cancel</Link>
      </div>
    </ValidatedForm>
  );
}

export default ExpenseForm;
