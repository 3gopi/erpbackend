const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/upload');

// Signup with image upload
router.post('/signup', upload.single('profile'), authController.signup);

// Login route
router.post('/login', authController.login);

module.exports = router;
