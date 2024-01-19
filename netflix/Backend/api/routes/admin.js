const express = require('express'); //import express

const router  = express.Router(); 

const adminController = require('../controllers/adminController');

router.post('/movie/upload', adminController.uploadMovie);

module.exports = router;
