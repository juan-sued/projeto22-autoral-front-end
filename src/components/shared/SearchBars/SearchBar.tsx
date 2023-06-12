import React, { ChangeEvent, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import styled from 'styled-components';

interface SearchBarProps {
  searchBar: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  sendSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchBar,
  onChange,
  sendSearch
}) => {
  return (
    <SearchBarStyle>
      <input
        id="top-nav-search-input"
        aria-autocomplete="list"
        type="text"
        className="search-input-field"
        name="searchBar"
        placeholder="ex: Açaí de banana"
        required
        value={searchBar}
        onChange={onChange}
      />
      <button className="buttonSubmitSearch" onClick={sendSearch}>
        <MdOutlineSearch color="#686868" size="25px" />
      </button>
    </SearchBarStyle>
  );
};

const SearchBarStyle = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding-left: 50px;

  .search-input-field {
    border: none;
    font-size: 17px;
    background-color: transparent;
    height: 100%;
    border-radius: 5px;
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
    padding-left: 10px;
    padding-right: 5px;
    min-width: 320px;
    width: 100%;
    border-right: none;

    margin-right: 10px;
    padding-right: 9%;
  }

  button {
    position: relative;
    right: 61.5px;
    height: 85%;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    width: 50px;
    background-color: #eeedf4;

    :hover {
      background-color: #e0e0e0;
      cursor: pointer;
    }
  }
};
`;
export default SearchBar;
