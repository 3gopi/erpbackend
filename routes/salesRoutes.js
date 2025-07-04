const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/', salesController.addSale);
router.get('/report', salesController.getReport);

module.exports = router;
