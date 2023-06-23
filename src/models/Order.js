const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  orders: {
    type: Array,
    required: true
  }
},{timestamps: true});

module.exports = mongoose.model('Order', orderSchema);