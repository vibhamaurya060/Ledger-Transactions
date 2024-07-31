import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../style/ledgerTransaction.css';

const LedgerTransaction = () => {
  const { ledgerId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://ledger-transactions.onrender.com/api/transactions/${ledgerId}`);
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [ledgerId]);

  return (
    <div className="ledger-detail-container">
      <h1 className="ledger-detail-heading">Transactions</h1>

      {loading ? (
        <p className="loader">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li key={transaction._id} className="transaction-item">
              <div>
                <strong>Date:</strong> {transaction.date}
                <p><strong>Ledger Name:</strong> {transaction.description}</p>
                <p><strong>Amount:</strong> {transaction.amount}</p>
                <p><strong>Transaction Type:</strong> {transaction.transactionType}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LedgerTransaction;
