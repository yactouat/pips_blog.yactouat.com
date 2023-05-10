import { FormEventHandler } from "react";

import Container from "@/lib/interfaces/technical/container";

interface FromWrapperProps extends Container {
  handleSubmit?: FormEventHandler;
  submitBtnText?: string;
  title: string;
}

export default FromWrapperProps;
