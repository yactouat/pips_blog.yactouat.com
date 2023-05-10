interface AppFeedbackAction {
  payload?: {
    modalText?: string;
  };
  type: "CLOSE_MODAL" | "OPEN_MODAL" | "SET_MODAL_TEXT";
}

export default AppFeedbackAction;
