const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController')

router.post('/addBook',bookController.registerUser)
router.post('/updateBook',bookController.loginUser)
router.post('/deleteBook',bookController.loginUser)
router.post('/listBook',bookController.loginUser)




module.exports = router;