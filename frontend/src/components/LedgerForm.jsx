import React, { useState } from 'react';
import axios from 'axios';
import '../style/ledgerForm.css'; 

// API call function
const createLedger = async (ledgerData) => {
  try {
    const response = await axios.post('https://ledger-transactions.onrender.com/api/ledgers/', ledgerData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error creating ledger');
  }
};

// LedgerForm component
const LedgerForm = () => {
  const [name, setName] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLedger({ name });
      alert('Ledger added')
    } catch (error) {
      console.error('Failed to create ledger:', error);
    }
  };

  return (
    <form className="ledger-form" onSubmit={handleSubmit}>
      <h2>Create Ledger</h2>
      <label>
        Ledger Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default LedgerForm;
