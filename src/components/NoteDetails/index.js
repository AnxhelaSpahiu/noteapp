import { Component, useState } from "react";
import Map from "../MapWrapper/index";
import "./index.scss";

export default class NoteDetails extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="note-details">
        <h1>Note name: {this.props.note.text}</h1>
        <h2>Category: {this.props.note.category}</h2>

        <Map
          customMarker={{
            lat: this.props.note.latitude,
            lng: this.props.note.longtitude,
          }}
          insertMode={false}
        />
      </div>
    );
  }
}
