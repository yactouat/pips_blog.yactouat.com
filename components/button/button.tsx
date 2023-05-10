import { useContext } from "react";

import AppDataContext from "@/app-state/app-data/app-data-context";
import ButtonProps from "./ButtonProps";
import styles from "./button.module.css";

const Button = ({ clickHandler, danger, submit, text }: ButtonProps) => {
  const { data: appData } = useContext(AppDataContext);

  return (
    <button
      onClick={
        clickHandler
          ? clickHandler
          : () => console.log("no handler implemented yet")
      }
      className={`bg-${
        appData!.theme
      }-primary-interactive text-template-dneutral p-2  ${styles.button} ${
        danger ? styles.dangerBtn : ""
      }`}
      type={submit ? "submit" : "button"}
    >
      {text}
    </button>
  );
};

export default Button;
