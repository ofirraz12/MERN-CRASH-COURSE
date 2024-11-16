import React, { useState, useRef, useEffect, useContext } from 'react';
import '../styles/componentStyle/HomeHeader.css';
import { CiSearch } from "react-icons/ci";
import { SearchContext } from './context/SearchContext.jsx';

function HomeHeader() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const { setSearchTerm } = useContext(SearchContext);
  const searchInputRef = useRef();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function handleClick() {
    setToggleSearch(!toggleSearch);
  }

  useEffect(() => {
    if (toggleSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [toggleSearch]);

  return (
    <header className='homeHeader'>
      <h1> Title </h1>
      {toggleSearch ? (
        <div className='open-search-container'>
          <input
            className='search-bar'
            ref={searchInputRef}
            onChange={handleSearchChange}
          />
          <button className='search-button' onClick={handleClick}>
            <CiSearch />
          </button>
        </div>
      ) : (
        <div className='close-search-container'>
          <button className='search-button' onClick={handleClick}>
            <CiSearch />
          </button>
        </div>
      )}
    </header>
  );
}

export default HomeHeader;
