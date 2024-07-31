// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [ledgers, setLedgers] = useState([]);
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchLedgers = async () => {
      const response = await axios.get('http://localhost:8080/api/ledgers');
      setLedgers(response.data);
    };
    fetchLedgers();
  }, []);

  const handleLedgerSelect = async (ledgerId) => {
    setSelectedLedger(ledgerId);
    const response = await axios.get(`http://localhost:8080/api/transactions?ledgerId=${ledgerId}`);
    setTransactions(response.data);
  };

  const handleFilter = async () => {
    if (selectedLedger) {
      const response = await axios.get(`http://localhost:8080/api/transactions?ledgerId=${selectedLedger}&startDate=${startDate}&endDate=${endDate}`);
      setTransactions(response.data);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Ledgers</h2>
      <ul>
        {ledgers.map((ledger) => (
          <li key={ledger._id} onClick={() => handleLedgerSelect(ledger._id)}>
            {ledger.name}
          </li>
        ))}
      </ul>
      {selectedLedger && (
        <div>
          <h2>Transactions</h2>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <button onClick={handleFilter}>Filter</button>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction._id}>
                {transaction.date} - {transaction.description} - {transaction.amount} - {transaction.transactionType}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
