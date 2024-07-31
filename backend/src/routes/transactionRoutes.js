
const express = require('express');
const { addTransaction, getTransactions, getTransactionById, getAllTransactions } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, getAllTransactions);
router.get('/', authMiddleware, getTransactions);
router.get('/:id', authMiddleware, getTransactionById);
module.exports = router;
