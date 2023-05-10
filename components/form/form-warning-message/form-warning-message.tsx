import React from "react";
import FormWarningMessageProps from "./FormWarningMessageProps";
import styles from "./form-warning-message.module.css";

const FormWarningMessage = ({ contents, small }: FormWarningMessageProps) => {
  return <p className={`my-2 ${small ? styles.small : ""}`}>⚠️ {contents}</p>;
};

export default FormWarningMessage;
