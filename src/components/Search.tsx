import React from "react";
import styled from "styled-components";
import searchicon from "../img/search.svg";

const Search: React.FC = () => {
  return (
    <SearchBar>
      <img src={searchicon} alt="search" draggable={false} />
      <input type="text" name="q" autoComplete="off" placeholder="Search" />
    </SearchBar>
  );
};

const SearchBar = styled.div`
  display: flex;
  box-shadow: 0px 0px 10px 3px rgb(0 0 0 / 16%);
  background-color: #ffff;
  align-items: center;
  justify-content: center;
  width: 560px;
  --height: 46px;
  height: var(--height);
  border-radius: var(--height);
  padding: 1px 20px;
  img {
    width: 18px;
    height: 18px;
    margin-right: 7px;
  }
  input {
    background: transparents;
    border: none;
    outline: none;
    width: 100%;
    font-size: 16px;
    color: #000000;
  }
`;

export default Search;
