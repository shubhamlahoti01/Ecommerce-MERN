const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter category name'],
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: [true, 'Slug should be unique'],
  },
});
module.exports = mongoose.model('Category', categorySchema);
