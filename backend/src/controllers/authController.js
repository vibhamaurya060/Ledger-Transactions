
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');


exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword, role });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        return res.status(400).json({ message: 'Username or email already exists' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Logout implementation
exports.logout = async (req, res) => {
    try {
      const token = req.headers['authorization'];
      if (!token) return res.status(400).send('No token provided');

    // Save the token to the blacklist
    const blacklistedToken = new BlacklistedToken({ token });
    await blacklistedToken.save();

    res.status(200).send('User logged out successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};