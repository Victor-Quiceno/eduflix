const { Router } = require('express');
const { getMedia, createMedia, updateMedia, deleteMedia } = require('../controllers/mediaController');

const router = Router();

router.get('/', getMedia);
router.post('/', createMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

module.exports = router;