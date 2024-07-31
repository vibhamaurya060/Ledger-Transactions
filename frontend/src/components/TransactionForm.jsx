import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/transactionForm.css'; 

// API call function
const addTransaction = async (transactionData) => {
  try {
    const response = await axios.post('https://ledger-transactions.onrender.com/api/transactions/', transactionData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error adding transaction');
  }
};

// TransactionForm component
const TransactionForm = ({ ledgerId }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('Given');
  const navigate = useNavigate(); // useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction({ ledgerId, date, description, amount, transactionType });
      navigate(`/ledger/${ledgerId}`); // Use navigate for redirection
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
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
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
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
