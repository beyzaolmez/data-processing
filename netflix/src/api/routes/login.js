const express = require('express'); //import express

const router  = express.Router(); 

const loginController = require('../controllers/loginController');

router.get('/', loginController.renderLoginPage);

module.exports = router;