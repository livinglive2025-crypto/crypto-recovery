import React from 'react';
import './EmptyState.css';

const EmptyState = ({ onRedirect }) => {
  return (
    <div className="empty-state-container">
      <div className="empty-state-content">
        <div className="empty-icon-wrapper">
          <div className="pulse-ring"></div>
          <span className="empty-icon">📂</span>
        </div>
        <h3 className="empty-title">No Wallet Connected</h3>
        <p className="empty-message">
          To view your assets, transactions, and swap history, please import an existing wallet first.
        </p>
        <button className="redirect-link" onClick={onRedirect}>
          Go to Restore Wallet to get started
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
