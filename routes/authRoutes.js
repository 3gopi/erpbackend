const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/signup', upload.single('profile'), authController.signup);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);
router.put('/password', authMiddleware, authController.changePassword);

module.exports = router;
