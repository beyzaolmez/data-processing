const express = require('express'); //import express

const router  = express.Router(); 

const indexController = require('../controllers/indexController');

router.get('/', indexController.getIndexPage);

module.exports = router;