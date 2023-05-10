import FormTextareaProps from "./FormTextareaProps";
import styles from "./form-textarea.module.css";

const FormTextarea = ({ id, name, placeholder }: FormTextareaProps) => {
  return (
    <textarea
      className={`${styles.formTextarea} border border-solid border-template-lneutralt1 dark:border-none`}
      id={id}
      name={name}
      rows={6}
      placeholder={placeholder}
      required
    ></textarea>
  );
};

export default FormTextarea;
