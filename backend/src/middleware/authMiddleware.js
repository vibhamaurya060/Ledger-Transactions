const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');

module.exports = async (req, res, next) => {
  // Extract token from the 'Authorization' header
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Split the header to get the token
  const token = authHeader.split(' ')[1]; // Split by space and get the second part

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Check for blacklisted token
    const isBlacklisted = await BlacklistedToken.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted, please log in again' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request
    req.user = decoded.user;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // Handle JWT verification errors
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
