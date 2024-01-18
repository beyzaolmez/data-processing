const express = require('express'); //import express

const router  = express.Router(); 

const registerController = require('../controllers/registerController'); 

router.post('/', registerController.newUser); 

module.exports = router; // export to use in server.js