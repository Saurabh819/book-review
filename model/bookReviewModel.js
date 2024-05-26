const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookID: {
    type: String,
    required: true,
    unique: true,
  },
  review: {
    type: String,
    required: true,
    
  },
  rating: {
    type: String,
    required: true,
    
  },

},{timestamps:true});


const Book = mongoose.model('Book', bookSchema);
module.exports = Book