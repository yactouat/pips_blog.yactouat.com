import FormLabelProps from "./FormLabelProps";
import styles from "./form-label.module.css";

const FormLabel = ({ htmlFor, small, text }: FormLabelProps) => {
  return (
    <>
      <label
        className={`mr-2 mb-2 ${
          small ? styles.fieldLabelSmall : styles.fieldLabel
        }`}
        htmlFor={htmlFor}
      >
        {text}:
      </label>{" "}
    </>
  );
};

export default FormLabel;
