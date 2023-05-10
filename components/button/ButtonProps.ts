import { MouseEventHandler } from "react";

interface ButtonProps {
  classesString?: string;
  clickHandler?: MouseEventHandler;
  danger?: boolean;
  submit?: boolean;
  text: string;
}

export default ButtonProps;
