import { Component, useState } from "react";
import AddNote from "../AddNote/index";
import "./index.scss";

const ModalInsertNote = (props) => {
  if (props.modal) {
    return (
      <>
        <div className="modal-wrapper"></div>
        <div className="modal">
          <button className="close" onClick={props.closeModal}>
            X
          </button>
          <AddNote sendText1={props.sendText} />
        </div>
      </>
    );
  }
  return null;
};

export default ModalInsertNote;
