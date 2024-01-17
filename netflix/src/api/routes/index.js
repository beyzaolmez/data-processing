const express = require('express'); //import express

const router  = express.Router(); 

const indexController = require('../controllers/indexController');

router.get('/', indexController.getIndexPage);
router.get('/users',indexController.getUsers);

module.exports = router;