import { useIsSubmitting, useIsValid } from "remix-validated-form";

export const ExpenseSubmitButton = () => {
  const isSubmitting = useIsSubmitting();
  const isValid = useIsValid();

  return (
    <button disabled={isSubmitting || !isValid}>
      {isSubmitting ? "Saving..." : "Save Expense"}
    </button>
  );
};
