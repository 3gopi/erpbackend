const Product = require('../models/productModel');

// GET /api/products
exports.getProducts = (req, res) => {
  Product.getAll(req.userId, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching products' });
    res.json(results);
  });
};

// POST /api/products
exports.addProduct = (req, res) => {
  Product.create(req.body, req.userId, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error adding product' });
    res.json({ message: 'Product added successfully' });
  });
};

// PUT /api/products/:id
exports.updateProduct = (req, res) => {
  Product.update(req.params.id, req.body, req.userId, (err) => {
    if (err) return res.status(500).json({ error: 'Error updating product' });
    res.json({ message: 'Product updated successfully' });
  });
};

// DELETE /api/products/:id
exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, req.userId, (err) => {
    if (err) return res.status(500).json({ error: 'Error deleting product' });
    res.json({ message: 'Product deleted successfully' });
  });
};
