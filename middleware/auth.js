const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'fallback_secret';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // remove 'Bearer '

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // ✅ Fix: set req.userId explicitly
    req.userId = decoded.id || decoded._id; // support both just in case
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
