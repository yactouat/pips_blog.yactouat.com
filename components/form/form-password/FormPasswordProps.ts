import { ChangeEventHandler } from "react";

interface FormPasswordProps {
  autocomplete?: string;
  id: string;
  label?: string;
  name: string;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export default FormPasswordProps;
