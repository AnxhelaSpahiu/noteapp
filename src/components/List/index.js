import { Component, useState } from "react";
import "./index.scss";

const List = (props) => {
  const theList = props.noteList1.map((x) => (
    <li onClick={() => props.setSelectedNote(x)}>
      {" "}
      {x.text} {x.category}
    </li>
  ));
  return (
    <div className="List">
      <ul>{theList}</ul>
    </div>
  );
};

export default List;
