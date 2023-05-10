import AppFeedbackContextInterface from "@/lib/interfaces/state/app-feedback/app-feedback-context";
import { createContext } from "react";

const AppFeedbackContext = createContext<AppFeedbackContextInterface>({
  closeModal: (ms: number | null = null) => null,
  modal: null,
  openModal: (modalText: string) => null,
  setModalText: (modalText: string) => null,
});

export default AppFeedbackContext;
