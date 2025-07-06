const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_jwt_secret_key'; // 🔐 Store in .env

// ✅ Signup Controller with image upload
exports.signup = async (req, res) => {
  try {
    const { username, email, number, password } = req.body;
    const profile = req.file ? `/uploads/${req.file.filename}` : null;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: 'Username or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      number,
      profile,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User created successfully',
      token
    });

  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).json({ error: 'Signup failed' });
  }
};
