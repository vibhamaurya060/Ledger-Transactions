const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');


require('dotenv').config();
const cors =require('cors');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/',(req,res)=>{
  res.send("This is a home route")
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ledgers',  ledgerRoutes);
app.use('/api/transactions', transactionRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
