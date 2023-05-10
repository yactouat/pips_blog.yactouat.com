import { MODAL_TIMEOUT as MODAL_DEFAULT_TIMEOUT } from "@/lib/constants/conf_constants";
import { ReactNode, useReducer } from "react";

import AppFeedbackContext from "./app-feedback-context";
import appFeedbackReducer from "./app-feedback-reducer";

const AppFeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appFeedbackReducer, {
    modal: null,
  });

  const closeModal = (ms: number | null = null) => {
    setTimeout(() => {
      dispatch({ type: "CLOSE_MODAL" });
    }, ms ?? MODAL_DEFAULT_TIMEOUT);
  };

  const openModal = (modalText: string) => {
    dispatch({ type: "OPEN_MODAL", payload: { modalText } });
  };

  const setModalText = (modalText: string) => {
    dispatch({ type: "SET_MODAL_TEXT", payload: { modalText } });
  };

  return (
    <AppFeedbackContext.Provider
      value={{ closeModal, modal: state.modal, openModal, setModalText }}
    >
      {children}
    </AppFeedbackContext.Provider>
  );
};

export default AppFeedbackProvider;
