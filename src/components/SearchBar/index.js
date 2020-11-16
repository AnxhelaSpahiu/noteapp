import { Component, useState } from "react";
import "./index.scss";
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
    <div className="Search-Section">
      <input
        className="Input"
        value={inputSearch}
        onChange={handleChangeSearch}
        placeholder="Type here to start searching"
      />
      <button
        className="Search-Button"
        disabled={!inputSearch}
        onClick={handleClickSearch}
      >
        Search Your Notes
      </button>
    </div>
  );
};

export default SearchBar;
