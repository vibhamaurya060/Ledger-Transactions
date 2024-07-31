const PDFDocument = require('pdfkit');
const Transaction = require('../models/Transaction');

exports.generatePDF = async (req, res) => {
  const { ledgerId, startDate, endDate } = req.query;

  // Validate ledgerId
  if (!ledgerId) {
    return res.status(400).json({ error: 'Ledger ID is required' });
  }

  let parsedStartDate, parsedEndDate;

  try {
    // Validate and parse startDate
    parsedStartDate = startDate ? new Date(startDate) : new Date(0); // Default to epoch if not provided
    if (isNaN(parsedStartDate.getTime())) {
      return res.status(400).json({ error: 'Invalid start date format' });
    }

    // Validate and parse endDate
    parsedEndDate = endDate ? new Date(endDate) : new Date(); // Default to now if not provided
    if (isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ error: 'Invalid end date format' });
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  try {
    // Fetch transactions from database
    const transactions = await Transaction.find({
      ledgerId,
      date: { $gte: parsedStartDate, $lte: parsedEndDate }
    });

    // Create a new PDF document
    const doc = new PDFDocument();
    
    // Set PDF headers
    res.setHeader('Content-disposition', 'attachment; filename=transactions_report.pdf');
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);
    doc.fontSize(25).text('Transactions Report', { align: 'center' });

    transactions.forEach(transaction => {
      doc.fontSize(12).text(`Date: ${transaction.date.toDateString()}`);
      doc.text(`Description: ${transaction.description}`);
      doc.text(`Amount: ${transaction.amount}`);
      doc.text(`Type: ${transaction.transactionType}`);
      doc.text('-----------------------------');
    });

    // End PDF document
    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
