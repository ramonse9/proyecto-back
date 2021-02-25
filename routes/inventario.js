/*
    /api/inventario
*/

const { Router } = require('express');
const { getInventario, crearInventario, actualizarInventario } = require('../controllers/inventario'); 

const router = Router();

router.get('/', getInventario );

router.post('/', crearInventario );

router.put('/:id', actualizarInventario );

module.exports = router;