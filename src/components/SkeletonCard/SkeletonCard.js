import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-info">
        <div className="skeleton-line skeleton-name"></div>
        <div className="skeleton-line skeleton-email"></div>
        <div className="skeleton-line skeleton-phone"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;