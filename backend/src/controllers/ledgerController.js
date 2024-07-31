
const Ledger = require('../models/Ledger');

exports.createLedger = async (req, res) => {
  const { name, description } = req.body;
  try {
    const ledger = new Ledger({ name, description });
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
