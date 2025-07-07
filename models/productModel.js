const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  price: Number,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
