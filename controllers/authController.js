const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const SECRET_KEY = process.env.SECRET_KEY || 'fallback_secret';

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, number, password } = req.body;
    const profile = req.file ? req.file.filename : null;

    if (!username || !email || !number || !password) {
      return res.status(400).json({ error: 'All fields except profile are required' });
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      number,
      profile,
      password: hashedPassword
    });

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '1d' });

    res.status(201).json({ message: 'Signup successful', token });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Signup failed' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1d' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Get user profile (protected)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, number } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { username, email, number },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect old password' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Password change failed' });
  }
};
