const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_jwt_secret_key'; // 🔐 store securely in .env

// ✅ Signup Controller
exports.signup = async (req, res) => {
  try {
    const { username, email, number, profile, password } = req.body;

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

    // 🔑 Generate JWT
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

// ✅ Login Controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid username or password' });

    // 🔑 Generate JWT
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        number: user.number,
        profile: user.profile
      }
    });

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
};
