const { Router } = require('express');
const { getGeneros, createGenero, updateGenero, deleteGenero } = require('../controllers/generoController');

const router = Router();

// Definir las rutas para los géneros
router.get('/', getGeneros);
router.post('/', createGenero);
router.put('/:id', updateGenero);
router.delete('/:id', deleteGenero);

module.exports = router;