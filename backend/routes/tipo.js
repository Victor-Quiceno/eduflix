const { Router } = require('express');
const { getTipos, createTipo, updateTipo, deleteTipo } = require('../controllers/tipoController');

const router = Router();

router.get('/', getTipos);
router.post('/', createTipo);
router.put('/:id', updateTipo);
router.delete('/:id', deleteTipo);
module.exports = router;