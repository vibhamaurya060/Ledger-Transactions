
const express = require('express');
const { createLedger, getLedgers } = require('../controllers/ledgerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin','user']), createLedger);
router.get('/', getLedgers);

module.exports = router;
