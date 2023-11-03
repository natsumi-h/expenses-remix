import { useNavigate } from "@remix-run/react";
import ExpenseForm, {
  expenseValidator,
} from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";
import { validationError } from "remix-validated-form";

export default function Add() {
  const navigate = useNavigate();
  const closeHandler = () => {
    navigate("..");
  };

  return (
    <>
      <Modal onClose={closeHandler}>
        <ExpenseForm />
      </Modal>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserSession(request);
  const result = await expenseValidator.validate(await request.formData());

  if (result.error) {
    return validationError(result.error);
  }

  if (!result.error) {
    const { title, amount, date } = result.data;
    const expenseData = {
      title,
      amount: +amount,
      date: new Date(date),
    };

    if (date && new Date(date).getTime() < new Date().getTime()) {
      await addExpense(expenseData, userId);
      return redirect("/expenses");
    }
  }
}
