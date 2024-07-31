
const Ledger = require('../models/Ledger');

exports.createLedger = async (req, res) => {
  const { name } = req.body;
  try {
    const ledger = new Ledger({ name });
    await ledger.save();
    res.status(201).json({ message: 'Ledger created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLedgers = async (req, res) => {
  try {
    const ledgers = await Ledger.find();
    res.json(ledgers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getLedgerById = async (req, res) => {
  const { id } = req.params;
  try {
    const ledger = await Ledger.findById(id); 
    if (!ledger) {
      return res.status(404).json({ message: 'Ledger not found' }); 
    }
    res.json(ledger); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};