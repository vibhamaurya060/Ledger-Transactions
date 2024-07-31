
const express = require('express');
const { addTransaction, getTransactions, getTransactionById, getAllTransactions } = require('../controllers/transactionController');


const router = express.Router();

router.post('/', addTransaction);
router.get('/', getAllTransactions);
router.get('/ledgerId', getTransactions);
router.get('/:id',  getTransactionById);
module.exports = router;
