const Product = require('../models/productModel');

exports.getProducts = (req, res) => {
  Product.getAll(req.userId, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.addProduct = (req, res) => {
  Product.create(req.body, req.userId, (err, result) => {
    if (err) res.status(500).json({ error: 'Error adding product' });
    else res.json({ message: 'Product added' });
  });
};

exports.updateProduct = (req, res) => {
  Product.update(req.params.id, req.body, req.userId, (err) => {
    if (err) res.status(500).json({ error: 'Error updating product' });
    else res.json({ message: 'Product updated' });
  });
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, req.userId, (err) => {
    if (err) res.status(500).json({ error: 'Error deleting product' });
    else res.json({ message: 'Product deleted' });
  });
};
