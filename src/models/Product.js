const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  descr: {
    type: String,
    required: false
  },
  season: {
    type: String,
    required: false
  },
  fit: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  fabric: {
    type: String,
    required: false
  },
  style: {
    type: String,
    required: false
  },
  specifications: {
    type: String,
    required: false
  },
  available:{
    type: Boolean,
    required: false
  },
  size: {
    type: Array,
    required: false
  },
  stock: {
    type: Number,
    required: false
  },
  userId:{
    type:String,
    required:true
  }

},{timestamps: true});

module.exports = mongoose.model('Product', productSchema);