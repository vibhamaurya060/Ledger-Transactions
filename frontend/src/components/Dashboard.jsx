import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LedgerTransaction from './LedgerTransaction'; 
import '../style/Dashboard.css'; 

const Dashboard = () => {
  const [ledgers, setLedgers] = useState([]);
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLedgers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://ledger-transactions.onrender.com/api/ledgers');
        setLedgers(response.data);
      } catch (err) {
        setError('Failed to fetch ledgers');
      } finally {
        setLoading(false);
      }
    };

    fetchLedgers();
  }, []);

  const handleLedgerSelect = (ledger) => {
    setSelectedLedger(ledger);
  };

  const closeModal = () => {
    setSelectedLedger(null);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Ledger Dashboard</h1>
      
      {loading ? (
        <p className="loader">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul className="ledger-list">
          {ledgers.map((ledger) => (
            <li
              key={ledger._id}
              onClick={() => handleLedgerSelect(ledger)}
              className={`ledger-item ${selectedLedger && selectedLedger._id === ledger._id ? 'selected' : ''}`}
            >
              <div>
                <strong>{ledger.name}</strong>
                <p>{ledger.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedLedger && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Ledger Transactions</h2>
              <button className="close-button" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <LedgerTransaction ledgerId={selectedLedger._id} closeModal={closeModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
