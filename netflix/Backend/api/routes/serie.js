const express = require('express');

const router  = express.Router(); 

router.post('/addSerie');
router.post('/:serieId/addEpisode');
router.post('/:serieId/:episodeId/removeEpisode');
router.post('/:serieId/:episodeId/addSubtitle');

module.exports = router;