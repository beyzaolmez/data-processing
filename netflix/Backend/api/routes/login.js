const express = require('express'); //import express

const router  = express.Router(); 

const loginController = require('../controllers/loginController');

router.post('/', loginController.login);

module.exports = router;