
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { generatePDF } = require('../controllers/pdfController');

const router = express.Router();

router.get('/transactions/pdf', authMiddleware, generatePDF);

module.exports = router;
