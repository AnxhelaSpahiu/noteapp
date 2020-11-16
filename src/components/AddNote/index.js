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
      <div>
        <input value={this.state.input} onChange={this.handleChange} />
        <label>
          Pick your category:
          <select
            value={this.state.category}
            onChange={this.handleChangeDropDown}
          >
            <option value="chores">Chores</option>
            <option value="coding">Coding</option>
            <option value="shopping">Shopping</option>
            <option value="skincare">Skincare</option>
          </select>
        </label>
        <button className="Button-Add" onClick={this.handleClick}>
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
