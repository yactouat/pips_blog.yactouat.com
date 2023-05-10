import FormField from "../form-field/form-field";
import FormInput from "../form-input/form-input";
import FormLabel from "../form-label/form-label";
import FormPasswordConstraints from "../form-password-constraints";
import FormPasswordProps from "./FormPasswordProps";
import styles from "./form-password.module.scss";

const FormPassword = ({
  autocomplete,
  id,
  label,
  name,
  required = true,
  onChange,
  value,
}: FormPasswordProps) => {
  return (
    <FormField>
      <FormLabel htmlFor={id} text={label ?? "password"} />
      <FormPasswordConstraints />
      <FormInput
        {...(autocomplete ? { autoComplete: autocomplete } : {})}
        {...(required ? { required: true } : {})}
        ariaDescribedby="password-constraints"
        id={id}
        name={name}
        onChange={onChange}
        type="password"
        value={value}
      />
    </FormField>
  );
};

export default FormPassword;
