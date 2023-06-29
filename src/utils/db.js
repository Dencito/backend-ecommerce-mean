const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongodbURI = process.env.MONGODB_URI;


  module.exports = {
    db: mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  }