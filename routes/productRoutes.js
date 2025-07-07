const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/auth');

// GET all products for a user
router.get('/', verifyToken, productController.getProducts);

// POST new product
router.post('/', verifyToken, productController.addProduct);

// PUT update product by ID
router.put('/:id', verifyToken, productController.updateProduct);

// DELETE product by ID
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;
