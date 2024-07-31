
const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  // Check for blacklisted token
  const isBlacklisted = await BlacklistedToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ msg: 'Token is blacklisted, please log in again' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};