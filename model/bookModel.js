const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    
  },
  auther: {
    type: String,
    required: true,
    
  },
  genre: {
    type: [String],
    enum: ["Action", "Horror","Mystry","Fantasy","Romance"],
    
  },
},{timestamps:true});


const Book = mongoose.model('Book', bookSchema);
module.exports = Book