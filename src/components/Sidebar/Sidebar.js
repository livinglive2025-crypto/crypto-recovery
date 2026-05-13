import React, { useState } from 'react';
import './Sidebar.css';
import Logo from "../../Images/logo.png"

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'assets', label: 'Assets' },
    { id: 'transactions', label: 'Transactions' },
    // { id: 'swap', label: 'Swap' },
    // { id: 'earn', label: 'Earn' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'import', label: 'Restore Wallet' },
  ];

  const handleMenuItemClick = (id) => {
    setCurrentPage(id);
    setIsMenuOpen(false); // Close menu after selecting
  };

  return (
    <aside className={`sidebar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="logo-section">
        <img src={Logo} alt="WalletHub Logo" className="logo-icon" />
        <h1 className="logo-text">WalletHub</h1>
        
        <button 
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuItemClick(item.id)}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          >
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="footer-icon">🛡️</div>
        <h4>Your keys, your crypto</h4>
        <p>WalletHub is non-custodial. We never store your private keys or seed phrase.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
