import React, { Component, useState } from "react";
import Map from "./components/MapWrapper/index";
import NoteDetails from "./components/NoteDetails";
import List from "./components/List";
import ModalInsertNote from "./components/ModalInsertNote";
import SearchBar from "./components/SearchBar";

import "./App.scss";

class App extends Component {
  state = {
    allNotes: [],
    filteredNotes: [],
    isOpen: false,
    filtered: false,
    selectedNoteDetails: null,
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

  handleSelectedNote = (note) => {
    console.log("note", note);
    this.setState({ selectedNoteDetails: note });
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
        <div className="note">
          <p className="welcome">This is your virtual Notebook</p>

          <button className="button-main" onClick={this.openModal}>
            +
          </button>
          <ModalInsertNote
            sendText={this.handleAddNote}
            modal={isOpen}
            closeModal={this.closeModal}
          />
          <p className="text">Refind your Previous Notes</p>
          <SearchBar sendSearchInput={this.handleSearch} />
          {filtered ? (
            filteredNotes.length ? (
              <List
                setSelectedNote={this.handleSelectedNote}
                noteList1={filteredNotes}
              />
            ) : (
              <div className="no-results">No results</div>
            )
          ) : allNotes.length ? (
            <List
              setSelectedNote={this.handleSelectedNote}
              noteList1={allNotes}
            />
          ) : (
            <div className="no-results">No Notes</div>
          )}
        </div>
        {this.state.selectedNoteDetails && (
          <>
            <div>
              <NoteDetails note={this.state.selectedNoteDetails} />
            </div>
            {
              <button
                class="close-details"
                onClick={() => this.setState({ selectedNoteDetails: null })}
              >
                X
              </button>
            }
          </>
        )}
      </div>
    );
  }
}

export default App;
