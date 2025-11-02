import React from 'react';
import './AlphabetSidebar.css';

const AlphabetSidebar = ({ groupedContacts, onLetterClick }) => {
  const letters = Object.keys(groupedContacts).sort();
  
  if (letters.length === 0) return null;

  return (
    <div className="alphabet-sidebar">
      <div className="sidebar-title">A-Z</div>
      <div className="letters-list">
        {letters.map(letter => (
          <button
            key={letter}
            className="letter-button"
            onClick={() => onLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetSidebar;