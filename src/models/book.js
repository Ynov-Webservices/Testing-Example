const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String
});

module.exports = mongoose.model('Book', bookSchema);