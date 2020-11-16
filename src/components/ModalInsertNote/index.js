import { Component, useState } from "react";
import AddNote from "../AddNote/index";
import "./index.scss";

const ModalInsertNote = (props) => {
  if (props.modal) {
    return (
      <div className="modal">
        <AddNote sendText1={props.sendText} />
        <button onClick={props.closeModal}>X</button>
      </div>
    );
  }
  return null;
};

export default ModalInsertNote;
