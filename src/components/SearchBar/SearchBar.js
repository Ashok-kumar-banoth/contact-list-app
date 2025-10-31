import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <div className="search-icon">🔍</div>
      <input
        type="text"
        placeholder="Search contacts by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button 
          className="clear-search"
          onClick={() => onSearchChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;