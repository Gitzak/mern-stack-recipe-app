const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    category_name: { type: String, required: true },
    description: String,
    category_image: String 
  });

  const Category = mongoose.model('Category', categorySchema);

  module.exports = { Category };