const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/getUsers', usersController.getUsers);
router.post('/:userId/updateSubscription');

module.exports = router;
