import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/LedgerTransaction.css';

const LedgerTransaction = ({ closeModal }) => {
  const [ledgers, setLedgers] = useState([]);
  const [selectedLedger, setSelectedLedger] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch list of ledgers
    const fetchLedgers = async () => {
      try {
        const response = await axios.get('https://ledger-transactions.onrender.com/api/ledgers');
        setLedgers(response.data);
      } catch (err) {
        setError('Failed to fetch ledgers');
      }
    };

    fetchLedgers();
  }, []);

  useEffect(() => {
    if (!selectedLedger) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://ledger-transactions.onrender.com/api/transactions', {
          params: {
            ledgerId: selectedLedger,
            startDate,
            endDate,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedLedger, startDate, endDate]);

  const handleDateChange = (e) => {
    if (e.target.name === 'startDate') {
      setStartDate(e.target.value);
    } else if (e.target.name === 'endDate') {
      setEndDate(e.target.value);
    }
  };

  const handleDateFilter = () => {
    if (!selectedLedger) {
      setError('No ledger selected');
      return;
    }

    // Trigger fetching transactions again
    fetchTransactions();
  };

  return (
    <div className="ledger-transaction-container">
      <button className="close-modal" onClick={closeModal}>Close</button>
      <h1 className="ledger-transaction-heading">Transactions for Ledger</h1>

      <div className="ledger-select">
        <label htmlFor="ledgerSelect">Select Ledger:</label>
        <select
          id="ledgerSelect"
          value={selectedLedger}
          onChange={(e) => setSelectedLedger(e.target.value)}
          className="ledger-dropdown"
        >
          <option value="">-- Select Ledger --</option>
          {ledgers.map((ledger) => (
            <option key={ledger._id} value={ledger._id}>
              {ledger.name}
            </option>
          ))}
        </select>
      </div>

      <div className="date-filter">
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleDateChange}
          className="date-input"
        />
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleDateChange}
          className="date-input"
        />
        <button onClick={handleDateFilter} className="filter-button">
          Filter
        </button>
      </div>

      {loading ? (
        <p className="loader">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          {transactions.length > 0 ? (
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td>{transaction.description}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td>{transaction.transactionType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-transactions">No transactions found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LedgerTransaction;
