import Modal from "../../technical/modal";

interface AppFeedbackContext {
  closeModal: (ms?: number | null) => void;
  modal: Modal | null;
  openModal: (modalText: string) => void;
  setModalText: (modalText: string) => void;
}

export default AppFeedbackContext;
