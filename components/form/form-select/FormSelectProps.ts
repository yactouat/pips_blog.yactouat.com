import { ChangeEventHandler } from "react";

interface SelectOption {
  displayed: string;
  value: string;
}

interface FormSelectProps {
  id: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  options: SelectOption[];
  readonly?: boolean;
  required?: boolean;
  selected?: string;
  value?: string;
}

export default FormSelectProps;
