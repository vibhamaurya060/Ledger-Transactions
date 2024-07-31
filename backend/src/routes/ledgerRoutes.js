
const express = require('express');
const { createLedger, getLedgers } = require('../controllers/ledgerController');


const router = express.Router();

router.post('/', createLedger);
router.get('/', getLedgers);
router.get('/:id', getLedgers);
module.exports = router;
