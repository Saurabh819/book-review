const express  = require('express');
const Book = require('../model/bookModel')

const addBook = async (req, res) => {
    try {
      const { title } = req.body;
      const isExistTitle = await Book.findOne({ title  });
      if (isExistTitle) {
        return res.status(403).json({
          success: false,
          massage: "Book Already exists",
        });
      }
  
      
      const newBook = await Book.create({
        title: req.body.title,
        description: req.body.description,
        auther: req.body.auther,
        genre: req.body.genre,
      });
  
      await newBook.save();
  
      return res.status(201).json({
        success: true,
        message: "Book Added Successfully",
        data: newBook,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

const getAllBooks = async (req,res)=>{
    try {
        const {page=1,limit=10} = req.query;

        const pageNumber = parseInt(page,10);
        const limitNumber = parseInt(limit,10);

        const book = await Book.find().limit(limitNumber).skip((page-1)*limitNumber);
        const bookCount = await Book.countDocuments();

         return res.status(200).json({
        success: true,
        message: "Book Added Successfully",
        data: book,
        currentPage:pageNumber,
        totalePages:Math.ceil(bookCount/limitNumber)
      });
    } catch (error) {
        console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }

}
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book Updated Successfully",
            data: updatedBook,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

// Delete Book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book Deleted Successfully",
            data: deletedBook,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

module.exports = {
    addBook,
    getAllBooks,
    updateBook,
    deleteBook
};


