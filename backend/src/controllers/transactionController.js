
const Transaction = require('../models/Transaction');
const Ledger = require('../models/Ledger'); 

exports.addTransaction = async (req, res) => {
  const { ledgerId, date, ledgerName, amount, transactionType } = req.body;

  try {
    // Validate if ledgerId exists
    const ledger = await Ledger.findById(ledgerId);
    if (!ledger) {
      return res.status(404).json({ error: 'Ledger not found' });
    }

    const transaction = new Transaction({ ledgerId, date, ledgerName, amount, transactionType });
    await transaction.save();
    res.status(201).json({ message: 'Transaction added successfully', transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const Transactions = await Transaction.find();
    res.json(Transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  const { ledgerId, startDate, endDate } = req.query;

  // Check if ledgerId is provided
  if (!ledgerId) {
    return res.status(400).json({ error: 'Ledger ID is required' });
  }

  // Validate and parse dates
  let parsedStartDate, parsedEndDate;

  try {
    parsedStartDate = startDate ? new Date(startDate) : new Date(0); 
    parsedEndDate = endDate ? new Date(endDate) : new Date();

    // Check if dates are valid
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  try {
    // Find transactions based on ledgerId and date range
    const transactions = await Transaction.find({
      ledgerId: ledgerId,
      date: { $gte: parsedStartDate, $lte: parsedEndDate }
    });

    // Check if any transactions were found
    if (transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found for the given ledger and date range' });
    }

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific transaction by ID
exports.getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
