import React, { useState } from 'react';
import './searchbar.css';

const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
   if (searchText.trim()) onSearch(searchText);     
    };

    return(
        <div className="search-bar-container">
            <input
            type="text"
            className="search-input"
            placeholder="Search for your favourite movie"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}/>
            <button 
            className="search-button"
            onClick={handleSearch}> Search </button>
        </div>
    );
};

export default SearchBar;