const Product = require('../models/productModel');

// GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user_id: req.userId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// POST /api/products
exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body, user_id: req.userId });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ error: 'Error adding product' });
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, user_id: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product updated', product: updated });
  } catch (err) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userId
    });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};
