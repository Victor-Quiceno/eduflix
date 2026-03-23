const { Router } = require('express');
const { getProductoras, createProductora, updateProductora } = require('../controllers/productoraController');
const router = Router();
router.get('/', getProductoras);
router.post('/', createProductora);
router.put('/:id', updateProductora);
module.exports = router;