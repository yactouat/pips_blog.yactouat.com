import { read } from "fs";
import FormInputProps from "./FormInputProps";
import styles from "./form-input.module.css";

const FormInput = ({
  ariaDescribedby,
  autocomplete,
  id,
  name,
  onChange,
  readonly,
  required,
  type,
  value,
}: FormInputProps) => {
  return (
    <input
      {...(ariaDescribedby ? { "aria-describedby": ariaDescribedby } : {})}
      {...(autocomplete ? { autoComplete: autocomplete } : {})}
      {...(onChange ? { onChange: onChange } : {})}
      {...(readonly ? { disabled: true } : {})}
      {...(required ? { required: true } : {})}
      {...(value ? { value: value } : {})}
      className={`${styles.formInput} border border-solid border-template-lneutralt1 dark:border-none`}
      id={id}
      name={name}
      type={type}
    />
  );
};

export default FormInput;
