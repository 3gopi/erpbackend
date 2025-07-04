const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const JWT_SECRET = 'your_secret_key';

exports.signup = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Hash error' });
    User.createUser({ username, password: hash }, (err) => {
      if (err) return res.status(500).json({ error: 'Signup failed' });
      res.json({ message: 'User created' });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findUserByUsername(username, (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'User not found' });
    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (!match) return res.status(401).json({ error: 'Wrong password' });
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    });
  });
};
