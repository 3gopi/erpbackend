const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const verifyToken = require('../middleware/auth');
sdgfgrssx
// CRUD routes for sales
router.get('/', verifyToken, salesController.getSales);         // Get all sales
router.post('/', verifyToken, salesController.addSale);         // Add a sale
router.put('/:id', verifyToken, salesController.updateSale);    // Update a sale
router.delete('/:id', verifyToken, salesController.deleteSale); // Delete a sale

// Sales report
router.get('/report', verifyToken, salesController.getReport);  // Get aggregated report

module.exports = router;
