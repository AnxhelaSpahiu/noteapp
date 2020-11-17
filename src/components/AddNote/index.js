import { Component, useState } from "react";
import Map from "../MapWrapper/index";
import "./index.scss";

class AddNote extends Component {
  state = {
    input: "",
    category: "chores",
    noteCordinates: {
      lat: 59.98319630913337,
      lng: 30.602260308265663,
    },
  };
  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };
  handleClick = () => {
    this.setState({ Input: "" });
    this.props.sendText1(
      this.state.input,
      this.state.category,
      this.state.noteCordinates
    );
  };

  handleChangeDropDown = (e) => {
    this.setState({ category: e.target.value });
  };

  handleSaveCordinates = (e) => {
    const lat = e.lat();
    const lng = e.lng();
    this.setState({ noteCordinates: { lat, lng } });
  };

  handleDropMarker = (e) => {
    this.setState({
      noteCordinates: {
        lat: e.lat,
        lng: e.lng,
      },
    });
  };

  render() {
    return (
      <div className="add-note">
        <input
          className="input"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <label className="category">
          Pick your category:
          <select
            value={this.state.category}
            onChange={this.handleChangeDropDown}
          >
            <option value="Chores">Chores</option>
            <option value="Coding">Coding</option>
            <option value="Shopping">Shopping</option>
            <option value="Skincare">Skincare</option>
          </select>
        </label>
        <button className="button-add" onClick={this.handleClick}>
          Add note
        </button>
        <Map
          note={this.state}
          insertMode={true}
          dropMarker={this.handleDropMarker}
        />
      </div>
    );
  }
}

export default AddNote;
