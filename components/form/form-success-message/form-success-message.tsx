import React from "react";
import FormSuccessMessageProps from "./FormSuccessMessageProps";
import styles from "./form-success-message.module.css";

const FormSuccessMessage = ({
  big,
  contents,
  small,
}: FormSuccessMessageProps) => {
  return (
    <p className={`my-2 ${small ? styles.small : ""} ${big ? styles.big : ""}`}>
      ✅ {contents}
    </p>
  );
};

export default FormSuccessMessage;
