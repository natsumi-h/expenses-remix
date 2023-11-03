import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  label: string;
};

export const AuthInput = ({ name, label }: MyInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <p>
      <label htmlFor={name}>{label}</label>
      <input
        {...getInputProps({
          id: name,
          type: name === "password" ? "password" : "email",
        })}
      />
      {error && <span>{error}</span>}
    </p>
  );
};
