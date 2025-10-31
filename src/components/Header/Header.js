import React from 'react';
import './Header.css';

const Header = ({ totalContacts, filteredCount, viewMode, onViewModeChange }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-main">
          <div className="header-icon">📇</div>
          <div>
            <h1>Contact List</h1>
            <p>Contact management system</p>
          </div>
        </div>
        
        <div className="header-stats">
          <div className="stat">
            <div className="stat-value">{totalContacts}</div>
            <div className="stat-label">Total Contacts</div>
          </div>
          <div className="stat">
            <div className="stat-value">{filteredCount}</div>
            <div className="stat-label">Showing</div>
          </div>
        </div>
      </div>
      
      <div className="header-actions">
        <div className="view-indicator">
          <span className="indicator-dot"></span>
          {viewMode === 'grid' ? 'Grid View' : 'List View'}
        </div>
      </div>
    </header>
  );
};

export default Header;