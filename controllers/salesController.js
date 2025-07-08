const Sale = require('../models/salesModel');
const mongoose = require('mongoose');

// ✅ GET /api/sales → Fetch all sales for logged-in user
exports.getSales = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    const sales = await Sale.find({ user_id: req.userId }).sort({ sale_date: -1 });
    res.json(sales);
  } catch (err) {
    console.error('Get Sales Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
};

// ➕ POST /api/sales → Add new sale
exports.addSale = async (req, res) => {
  try {
    const { product_id, quantity, sale_date } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const newSale = new Sale({
      product_id: new mongoose.Types.ObjectId(product_id),
      quantity,
      sale_date: sale_date ? new Date(sale_date) : new Date(),
      user_id: new mongoose.Types.ObjectId(req.userId),
    });

    await newSale.save();
    res.status(201).json({ message: 'Sale recorded successfully', sale: newSale });
  } catch (err) {
    console.error('Add Sale Error:', err.message);
    res.status(500).json({ error: 'Failed to add sale' });
  }
};

// 🖊️ PUT /api/sales/:id → Update a sale
exports.updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, quantity, sale_date } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid sale ID' });
    }

    const updated = await Sale.findOneAndUpdate(
      { _id: id, user_id: req.userId },
      {
        ...(product_id && { product_id: new mongoose.Types.ObjectId(product_id) }),
        ...(quantity && { quantity }),
        ...(sale_date && { sale_date: new Date(sale_date) }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Sale not found or not authorized' });

    res.json({ message: 'Sale updated', sale: updated });
  } catch (err) {
    console.error('Update Sale Error:', err.message);
    res.status(500).json({ error: 'Failed to update sale' });
  }
};

// 🗑️ DELETE /api/sales/:id → Delete a sale
exports.deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid sale ID' });
    }

    const deleted = await Sale.findOneAndDelete({ _id: id, user_id: req.userId });

    if (!deleted) return res.status(404).json({ error: 'Sale not found or not authorized' });

    res.json({ message: 'Sale deleted' });
  } catch (err) {
    console.error('Delete Sale Error:', err.message);
    res.status(500).json({ error: 'Failed to delete sale' });
  }
};

// 📊 GET /api/sales/report → Aggregate report per product
exports.getReport = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

    const report = await Sale.aggregate([
      {
        $match: { user_id: new mongoose.Types.ObjectId(req.userId) },
      },
      {
        $lookup: {
          from: 'products', // Ensure this matches your MongoDB collection name
          localField: 'product_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product_id',
          productName: { $first: '$product.name' },
          totalSold: { $sum: '$quantity' },
          totalRevenue: { $sum: { $multiply: ['$quantity', '$product.price'] } },
        },
      },
      { $sort: { totalSold: -1 } }, // Optional sorting by quantity sold
    ]);

    res.json(report);
  } catch (err) {
    console.error('Get Report Error:', err.message);
    res.status(500).json({ error: 'Failed to get report' });
  }
};
