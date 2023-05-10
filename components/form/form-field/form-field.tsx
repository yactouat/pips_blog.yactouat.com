import FormFieldProps from "./FormFieldProps";
import styles from "./form-field.module.css";

const FormField = ({ children }: FormFieldProps) => {
  return (
    <section
      className={`${styles.formField} my-1 text-template-lneutral dark:text-template-dneutral`}
    >
      {children}
    </section>
  );
};

export default FormField;
