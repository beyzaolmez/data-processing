const express = require('express');

const router  = express.Router(); 

const profileController = require('../controllers/profileController');

router.post('/:userId/profile/addProfile', profileController.addProfile);

module.exports = router;