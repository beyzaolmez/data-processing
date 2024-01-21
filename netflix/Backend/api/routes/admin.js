const express = require('express');

const router  = express.Router(); 

const adminController = require('../controllers/adminController');

const adminsController = require('../controllers/adminController');

router.post('/movie/upload', adminController.uploadMovie);

router.get('/movie/getMovies', adminController.getMovies);

module.exports = router;
