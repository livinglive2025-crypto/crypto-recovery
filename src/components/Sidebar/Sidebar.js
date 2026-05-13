import React from 'react';
import './Sidebar.css';
import Logo from "../../Images/logo.png"

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'assets', label: 'Assets' },
    { id: 'transactions', label: 'Transactions' },
    // { id: 'swap', label: 'Swap' },
    // { id: 'earn', label: 'Earn' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'import', label: 'Restore Wallet' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <img src={Logo} alt="WalletHub Logo" className="logo-icon" />
        <h1 className="logo-text">WalletHub</h1>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
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
