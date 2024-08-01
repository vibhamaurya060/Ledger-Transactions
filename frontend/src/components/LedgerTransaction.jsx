// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import '../style/LedgerTransaction.css';

// const LedgerTransactions = () => {
//   const { ledgerId } = useParams();
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:8080/api/transactions', {
//           params: { ledgerId: ledgerId }
//         });
//         setTransactions(response.data);
//       } catch (err) {
//         setError('Failed to fetch transactions');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, [ledgerId]);

//   return (
//     <div className="transactions-container">
//       <h1 className="transactions-heading">Transactions for Ledger {ledgerId}</h1>

//       {loading ? (
//         <p className="loader">Loading...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <table className="transactions-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Name</th>
//               <th>Amount</th>
//               <th>Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((transaction) => (
//               <tr key={transaction._id}>
//                 <td>{new Date(transaction.date).toLocaleDateString()}</td>
//                 <td>{transaction.ledgerName}</td>
//                 <td>${transaction.amount}</td>
//                 <td>{transaction.transactionType}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default LedgerTransactions;




// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import '../style/LedgerTransaction.css';

// const LedgerTransactions = () => {
//   const { ledgerId } = useParams();
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [startDate, setStartDate] = useState('');  // State for start date
//   const [endDate, setEndDate] = useState('');      // State for end date
//   const [filteredTransactions, setFilteredTransactions] = useState([]);  // State for filtered transactions

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:8080/api/transactions', {
//           params: { ledgerId: ledgerId }
//         });
//         setTransactions(response.data);
//         setFilteredTransactions(response.data);  // Initialize filtered transactions
//       } catch (err) {
//         setError('Failed to fetch transactions');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, [ledgerId]);

//   // Function to handle date filtering
//   const handleFilter = () => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const filtered = transactions.filter(transaction => {
//       const transactionDate = new Date(transaction.date);
//       return transactionDate >= start && transactionDate <= end;
//     });

//     setFilteredTransactions(filtered);
//   };

//   return (
//     <div className="transactions-container">
//       <h1 className="transactions-heading">Transactions for Ledger {ledgerId}</h1>

//       {/* Date filter inputs */}
//       <div className="filter-container">
//         <label>
//           Start Date:
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </label>
//         <label>
//           End Date:
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </label>
//         <button onClick={handleFilter} className="filter-button">Filter</button>
//       </div>

//       {loading ? (
//         <p className="loader">Loading...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <table className="transactions-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Name</th>
//               <th>Amount</th>
//               <th>Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTransactions.map((transaction) => (
//               <tr key={transaction._id}>
//                 <td>{new Date(transaction.date).toLocaleDateString()}</td>
//                 <td>{transaction.ledgerName}</td>
//                 <td>${transaction.amount}</td>
//                 <td>{transaction.transactionType}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default LedgerTransactions;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/LedgerTransaction.css';
import PdfReportComponent from './PdfReportComponent'; // Import PdfReportComponent

const LedgerTransactions = () => {
  const { ledgerId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState(''); // State for start date
  const [endDate, setEndDate] = useState(''); // State for end date
  const [filteredTransactions, setFilteredTransactions] = useState([]); // State for filtered transactions

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://ledger-transactions.onrender.com/api/transactions', {
          params: { ledgerId: ledgerId },
        });
        setTransactions(response.data);
        setFilteredTransactions(response.data); // Initialize filtered transactions
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [ledgerId]);

  // Function to handle date filtering
  const handleFilter = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= start && transactionDate <= end;
    });

    setFilteredTransactions(filtered);
  };

  return (
    <div className="transactions-container">
      <h1 className="transactions-heading">Transactions for Ledger {ledgerId}</h1>

      {/* Date filter inputs */}
      <div className="filter-container">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={handleFilter} className="filter-button">
          Filter
        </button>
      </div>

      {loading ? (
        <p className="loader">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {/* Add PdfReportComponent for generating PDF */}
          <PdfReportComponent
            transactions={filteredTransactions}
            ledgerId={ledgerId}
            startDate={startDate}
            endDate={endDate}
          />

          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.ledgerName}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.transactionType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default LedgerTransactions;
