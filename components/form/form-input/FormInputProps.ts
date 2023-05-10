import { ChangeEventHandler } from "react";

interface FormInputProps {
  ariaDescribedby?: string;
  autocomplete?: string;
  id: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  readonly?: boolean;
  required?: boolean;
  type: "email" | "password" | "text";
  value?: string;
}

export default FormInputProps;
