import React from "react";
import styles from "./Modal.module.css"
import Button from "./Button";

const Modal = (props) => {
  if (!props.isOpen) return null;

  return (
    <>
    <div className={styles.opaque}></div>
    <div className={styles.modal}>
      {props.children}
      <Button onClick={props.onClose}>Close</Button>
    </div>
    </>
  );
};

export default Modal;
