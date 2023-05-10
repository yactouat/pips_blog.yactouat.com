import AppFeedbackActionInterface from "@/lib/interfaces/state/app-feedback/app-feedback-action";
import AppFeedbackStateInterface from "@/lib/interfaces/state/app-feedback/app-feedback-state";

const appFeedbackReducer = (
  state: AppFeedbackStateInterface,
  action: AppFeedbackActionInterface
): AppFeedbackStateInterface => {
  switch (action.type) {
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: {
          isOpen: false,
          text: "",
        },
      };
    case "OPEN_MODAL":
      return {
        ...state,
        modal: {
          isOpen: true,
          text: action.payload!.modalText,
        },
      };
    case "SET_MODAL_TEXT":
      return {
        ...state,
        modal: {
          isOpen: state.modal!.isOpen,
          text: action.payload!.modalText,
        },
      };
    default:
      return state;
  }
};

export default appFeedbackReducer;
