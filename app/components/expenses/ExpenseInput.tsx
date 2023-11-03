import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  label: string;
  defaultValues: any;
};

export const ExpenseInput = ({
  name,
  label,
  defaultValues,
}: MyInputProps) => {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const { error, getInputProps } = useField(name);
  return (
    <p>
      <label htmlFor={name}>{label}</label>
      <input
        defaultValue={name === "date" ? defaultValues.slice(0, 10) : defaultValues}
        {...getInputProps({
          id: name,
          type:
            name === "date" ? "date" : name === "amount" ? "number" : "text",
          max: name === "date" ? today : undefined,
        })}
      />
      {error && <span>{error}</span>}
    </p>
  );
};
