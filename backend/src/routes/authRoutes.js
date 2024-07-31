
const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// Logout
router.post('/logout', authMiddleware, logout); 
module.exports = router;
