import FormMicroCopyProps from "./FormMicroCopyProps";

import styles from "./form-microcopy.module.css";

const FormMicroCopy = ({ id, text }: FormMicroCopyProps) => {
  return (
    <p className={`${styles.formMicrocopy} mb-2`} id={id ?? ""}>
      {text}
    </p>
  );
};

export default FormMicroCopy;
