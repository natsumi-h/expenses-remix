import { useNavigate } from "@remix-run/react";
import ExpenseForm, {
  expenseValidator,
} from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { redirect, type ActionFunctionArgs, json } from "@remix-run/node";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validationError } from "remix-validated-form";

export default function Edit() {
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

export async function action({ params, request }: ActionFunctionArgs) {
  const expenseId = params.id;

  if (request.method == "POST") {
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
        await updateExpense(expenseId as string, expenseData);
        return redirect("/expenses");
      }
    }
  } else if (request.method == "DELETE") {
    await deleteExpense(expenseId as string);
    return json({ deletedId: expenseId });
  }
}
