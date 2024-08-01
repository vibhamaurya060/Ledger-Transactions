

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import '../style/Dashboard.css';

const Dashboard = () => {
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLedgers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://ledger-transactions.onrender.com/api/ledgers/');
        setLedgers(response.data);
      } catch (err) {
        setError('Failed to fetch ledgers');
      } finally {
        setLoading(false);
      }
    };

    fetchLedgers();
  }, []);

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
            <li key={ledger._id} className="ledger-item">
              <div>
                <strong>{ledger.name}</strong>
               <br/>
               <br/>
                <button 
                  style={{width:"100px", height:"35px", border:"none", borderRadius:"5px", backgroundColor:"#ff86c2", color:"white", fontWeight:"600"}} 
                  onClick={() => navigate(`/transactions/${ledger._id}`)}
                >
                  Transactions
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
