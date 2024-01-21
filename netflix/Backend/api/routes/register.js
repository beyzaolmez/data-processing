const express = require('express');

const router  = express.Router(); 

const registerController = require('../controllers/registerController'); 

router.get('/display', registerController.displayRegiser);
router.post('/', registerController.registerUser); 

module.exports = router;
