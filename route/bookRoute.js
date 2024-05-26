const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController')
const {protect,admin} = require('../middleware/auth')

router.post('/addBook',[protect,admin],bookController.addBook)
router.put('/updateBook/:id',[protect,admin],bookController.updateBook)
router.delete('/deleteBook/:id',[protect,admin],bookController.deleteBook)
router.get('/getAllBook',bookController.getAllBooks)





module.exports = router;