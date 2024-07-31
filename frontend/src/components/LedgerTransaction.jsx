import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/LedgerTransaction.css';

const LedgerTransactions = () => {
  const { ledgerId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://ledger-transactions.onrender.com/api/transactions', {
          params: { ledgerId: ledgerId }
        });
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
    <div className="transactions-container">
      <h1 className="transactions-heading">Transactions for Ledger {ledgerId}</h1>

      {loading ? (
        <p className="loader">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.transactionType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LedgerTransactions;
