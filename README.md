# Ledger-Transactions


## Objective
This project is designed to provide a web-based ledger and transaction management system using the MERN stack. The application allows users to create ledger entries, manage transactions, filter transactions by date, and generate PDF reports of transactions.

## Features

1. Ledger Management:
Create and manage ledger entries.

2. Transactions Management:
Add transactions linked to a specific ledger with details such as transaction amount, date, and type (Given or Taken).

3. Dashboard:
Display a list of all created ledgers.
Select a ledger to view and filter its transactions within specific dates.

4. PDF Generation:
Generate a PDF report of transactions for a selected ledger within a specified date range.

5. Data Security:
Secure data stored in MongoDB with encryption to prevent unauthorized access.


## Usage

1. Create a Ledger:
Use the provided form on the dashboard to create a new ledger.

2. Add Transactions:
Select a ledger and use the transaction form to add new transactions.

3. View Transactions:
Select a ledger and filter transactions by date to view specific entries.

4. Generate PDF Reports:
Use the option to generate a PDF report of transactions for a selected ledger within a specific date range.


## Technologies Used

### Frontend:
React.js
Axios for HTTP requests
React Router DOM for navigation
Material-UI for styling and components

### Backend:
Node.js
Express.js for server handling
Mongoose for MongoDB interactions
jsonwebtoken for authentication
PDFKit for PDF generation

### Database:
MongoDB for data storage
