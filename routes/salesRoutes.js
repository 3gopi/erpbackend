const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, salesController.addSale);
router.get('/report', verifyToken, salesController.getReport);

module.exports = router;
