import ModalProps from "./ModalProps";
import styles from "./modal.module.css";

const Modal = ({ children }: ModalProps) => {
  return (
    <>
      <section className={`${styles.modal}`}>{children}</section>
      <div className={`${styles.modalOverlay}`}></div>
    </>
  );
};

export default Modal;
