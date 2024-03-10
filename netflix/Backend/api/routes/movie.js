const express = require('express');

const router  = express.Router(); 

const movieController = require('../controllers/movieController');

router.post('/addMovie', movieController.uploadMovie);
router.post('/:movieId/deleteMovie');
router.post('/:movieId/addSubtitle');
router.post('/:movieId/updateSubtitle');
router.post('/:movieId/removeSubtitle');

module.exports = router;