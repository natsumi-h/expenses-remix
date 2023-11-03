import { useIsSubmitting, useIsValid } from "remix-validated-form";

type SubmitBtnCaption = {
  submitBtnCaption: string;
};

export const AuthSubmitButton = ({ submitBtnCaption }: SubmitBtnCaption) => {
  const isSubmitting = useIsSubmitting();
  const isValid = useIsValid();
  
  return (
    <button type="submit" disabled={isSubmitting || !isValid}>
      {isSubmitting ? "Authenticating..." : submitBtnCaption}
    </button>
  );
};
