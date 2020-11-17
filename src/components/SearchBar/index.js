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
    <div className="search-section">
      <input
        className="input"
        value={inputSearch}
        onChange={handleChangeSearch}
        placeholder="Type here to start searching"
      />
      <button
        className="search-button"
        disabled={!inputSearch}
        onClick={handleClickSearch}
      >
        Search Your Notes
      </button>
    </div>
  );
};

export default SearchBar;
