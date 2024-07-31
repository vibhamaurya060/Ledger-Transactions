
const express = require('express');
const { createLedger, getLedgers, getLedgerById } = require('../controllers/ledgerController');


const router = express.Router();

router.post('/', createLedger);
router.get('/', getLedgers);
router.get('/:id', getLedgerById);

module.exports = router;
