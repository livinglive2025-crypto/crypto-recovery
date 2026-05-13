import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import ImportWallet from './components/ImportWallet/ImportWallet';
import EmptyState from './components/EmptyState/EmptyState';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('import');

  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="main-content">
        <header className="top-header">
          <button className="help-btn">❓ Help Center</button>
        </header>

        <div className="content-scroll">
          {currentPage === 'import' ? (
            <ImportWallet />
          ) : (
            <EmptyState onRedirect={() => setCurrentPage('import')} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
