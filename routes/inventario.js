/*
    /api/inventario
*/

const { Router } = require('express');
const { getInventario, crearInventario, actualizarInventario, eliminarInventario } = require('../controllers/inventario'); 

const router = Router();

router.get('/', getInventario );

router.post('/', crearInventario );

router.put('/:id', actualizarInventario );

router.post('/eliminar/:id', eliminarInventario );

module.exports = router;