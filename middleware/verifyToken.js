const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'fallback_secret';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ✅ LOG THIS — check what comes in
  console.log("🔐 Incoming Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized: user ID missing from token' });
    }

    next();
  } catch (err) {
    console.error('❌ JWT Verify Error:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
};
