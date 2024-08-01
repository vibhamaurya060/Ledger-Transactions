import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/transactionForm.css';

// API call function
const addTransaction = async (transactionData) => {
  try {
    const response = await axios.post('https://ledger-transactions.onrender.com/', transactionData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error adding transaction');
  }
};

// TransactionForm component
const TransactionForm = () => {
  const [ledgerId, setLedgerId] = useState('66aa48eb4e77d791f75e333e'); 
  const [ledgerName, setLedgerName] = useState('Ledger2'); 
  const [amount, setAmount] = useState(800.00); 
  const [date, setDate] = useState('2024-06-05'); 
  const [transactionType, setTransactionType] = useState('Taken'); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    // Validation checks
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid positive amount');
      return;
    }

    if (!date) {
      setError('Please select a valid date');
      return;
    }

    if (!ledgerName.trim()) {
      setError('Ledger name cannot be empty');
      return;
    }

    // Make the API call
    try {
      await addTransaction({
        ledgerId,
        date,
        ledgerName,
        amount: parseFloat(amount).toFixed(2), 
        transactionType,
      });
      
      navigate(`/ledger/${ledgerId}`); 
    } catch (error) {
      console.error('Failed to add transaction:', error);
      setError(error.message || 'Failed to add transaction. Please try again.');
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      {error && <p className="error-message">{error}</p>}
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01"
          step="0.01"
          placeholder="Enter transaction amount"
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Ledger Name:
        <input
          type="text"
          value={ledgerName}
          onChange={(e) => setLedgerName(e.target.value)}
          required
          placeholder="Enter Ledger Name"
        />
      </label>
      <label>
        Type:
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="Given">Given</option>
          <option value="Taken">Taken</option>
        </select>
      </label>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
