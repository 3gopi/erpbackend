const mongoose = require('mongoose');
const Product = require('../models/productModel');

// ✅ GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user_id: req.userId });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// ✅ POST /api/products
exports.addProduct = async (req, res) => {
  try {
    const { name, stock, price } = req.body;

    if (!name || stock === undefined || price === undefined) {
      return res.status(400).json({ error: 'Please provide name, stock, and price' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized: user ID missing from token' });
    }

    const newProduct = new Product({
      name,
      stock,
      price,
      user_id: req.userId
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct
    });
  } catch (err) {
    console.error('Add Product Error:', err);
    res.status(500).json({ error: 'Error adding product' });
  }
};

// ✅ PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized: user ID missing from token' });
    }

    const updated = await Product.findOneAndUpdate(
      { _id: productId, user_id: req.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Product not found or not authorized' });
    }

    res.json({
      message: 'Product updated successfully',
      product: updated
    });
  } catch (err) {
    console.error('Update Product Error:', err);
    res.status(500).json({ error: 'Error updating product' });
  }
};

// ✅ DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized: user ID missing from token' });
    }

    const deleted = await Product.findOneAndDelete({
      _id: productId,
      user_id: req.userId
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Product not found or not authorized' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete Product Error:', err);
    res.status(500).json({ error: 'Error deleting product' });
  }
};
