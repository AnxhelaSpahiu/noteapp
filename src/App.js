import React, { Component, useState } from "react";
import "./App.scss";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      onClick={(e) => {
        props.saveNoteCordinates(e.latLng);
      }}
      defaultZoom={15}
      defaultCenter={{
        lat: props.currentLocation.lat || 41.3309769,
        lng: props.currentLocation.lng || 19.7828037,
      }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{
            lat: props.currentLocation.lat,
            lng: props.currentLocation.lng,
          }}
        />
      )}
    </GoogleMap>
  ))
);

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
class AddNote extends Component {
  state = {
    Input: "",
    Category: "chores",
    noteCordinates: {
      lat: "",
      lng: "",
    },
  };
  handleChange = (e) => {
    this.setState({ Input: e.target.value });
  };
  handleClick = () => {
    this.setState({ Input: "" });
    this.props.sendText1(
      this.state.Input,
      this.state.Category,
      this.state.noteCordinates
    );
  };

  handleChangeDropDown = (e) => {
    this.setState({ Category: e.target.value });
  };

  handleSaveCordinates = (e) => {
    const lat = e.lat();
    const lng = e.lng();
    this.setState({ noteCordinates: { lat, lng } });
  };
  render() {
    const markerHasDropped = this.state.noteCordinates.lat ? true : false;
    console.log(this.state.noteCordinates);
    return (
      <div>
        <input value={this.state.Input} onChange={this.handleChange} />
        <label>
          Pick your category:
          <select
            value={this.state.Category}
            onChange={this.handleChangeDropDown}
          >
            <option value="chores">Chores</option>
            <option value="coding">Coding</option>
            <option value="shopping">Shopping</option>
            <option value="skincare">Skincare</option>
          </select>
        </label>
        <button onClick={this.handleClick}>Add note</button>
        <MyMapComponent
          saveNoteCordinates={this.handleSaveCordinates}
          isMarkerShown={markerHasDropped}
          // markers={[]}
          currentLocation={this.state.noteCordinates}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDgEUPi-6e2KZZ-2RfDAMoeMZQ3RHLPM9g&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

const List = (props) => {
  const theList = props.noteList1.map((x) => (
    <li>
      {" "}
      {x.text} {x.category} {x.latitude}
    </li>
  ));
  return (
    <div>
      <ul>{theList}</ul>
    </div>
  );
};

const SearchBar = (props) => {
  const [inputSearch, setInputSearch] = useState("");

  const handleChangeSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const handleClickSearch = () => {
    setInputSearch("");
    props.sendSearchInput(inputSearch);
  };

  return (
    <div>
      <input
        value={inputSearch}
        onChange={handleChangeSearch}
        placeholder="Type here to start searching"
      />
      <button disabled={!inputSearch} onClick={handleClickSearch}>
        Search Your Notes
      </button>
    </div>
  );
};

class App extends Component {
  state = {
    allNotes: [],
    filteredNotes: [],
    isOpen: false,
    filtered: false,
    markers: [
      {
        text: "mdfdjf",
        lat: null,
        lng: null,
      },
    ],
    currentLocation: {
      lat: null,
      lng: null,
    },
  };

  handleAddNote = (event, event1, currentLocation) => {
    const newNote = {
      text: event.toLowerCase(),
      id: Math.random,
      category: event1,
      latitude: currentLocation.lat,
      longtitude: currentLocation.lng,
    };

    this.setState({
      allNotes: [...this.state.allNotes, newNote],
      filtered: false,
    });
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  handleSearch = (query) => {
    if (this.state.allNotes.length) {
      const filteredNotes = this.state.allNotes.filter(
        (note) => note.text.indexOf(query.toLowerCase()) !== -1
      );

      this.setState({ filteredNotes });
    }

    this.setState({ filtered: true });
  };

  render() {
    const { isOpen, filteredNotes, allNotes, filtered } = this.state;
    return (
      <div className="container">
        <p> This is your NOTELIST</p>
        <button onClick={this.openModal}>Add Note</button>
        <ModalInsertNote
          sendText={this.handleAddNote}
          modal={isOpen}
          closeModal={this.closeModal}
        />
        <SearchBar sendSearchInput={this.handleSearch} />
        {filtered ? (
          filteredNotes.length ? (
            <List noteList1={filteredNotes} />
          ) : (
            <div className="no-results">No results</div>
          )
        ) : allNotes.length ? (
          <List noteList1={allNotes} />
        ) : (
          <div className="no-results">No Notes</div>
        )}
      </div>
    );
  }
}

export default App;
