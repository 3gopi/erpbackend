const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/upload'); // 👈 Multer middleware

// Signup with profile image upload
router.post('/signup', upload.single('profile'), authController.signup);

// Normal login route
router.post('/login', authController.login);

module.exports = router;
