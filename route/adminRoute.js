const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController')

router.post('/registeradmin',adminController.registeradmin)
router.post('/loginadmin',adminController.loginAdmin)



module.exports = router;