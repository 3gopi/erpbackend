const Sale = require('../models/salesModel');
const mongoose = require('mongoose');

// ➕ POST /api/sales
exports.addSale = async (req, res) => {
  try {
    const { product_id, quantity, sale_date } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized: user ID missing from token' });
    }

    const newSale = new Sale({
      product_id: new mongoose.Types.ObjectId(product_id),
      quantity,
      sale_date: sale_date ? new Date(sale_date) : new Date(),
      user_id: new mongoose.Types.ObjectId(req.userId)
    });

    await newSale.save();
    res.status(201).json({ message: 'Sale recorded successfully' });
  } catch (err) {
    console.error('Add Sale Error:', err);
    res.status(500).json({ error: 'Failed to add sale' });
  }
};

// 📊 GET /api/sales/report
exports.getReport = async (req, res) => {
  try {
    const report = await Sale.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(req.userId)
        }
      },
      {
        $lookup: {
          from: 'products', // 👈 use correct collection name here
          localField: 'product_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product_id',
          product: { $first: '$product.name' },
          total_sold: { $sum: '$quantity' },
          total_revenue: { $sum: { $multiply: ['$quantity', '$product.price'] } }
        }
      }
    ]);

    res.json(report);
  } catch (err) {
    console.error('Get Report Error:', err);
    res.status(500).json({ error: 'Failed to get report' });
  }
};

