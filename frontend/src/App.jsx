// src/App.js

import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";
import TransactionForm from './components/TransactionForm';
import LedgerForm from './components/LedgerForm';




function App() {
 

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ledgerForm" element={<LedgerForm/>} />
          <Route path="/transactionForm" element={<TransactionForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
