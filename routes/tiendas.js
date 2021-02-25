/*
    /api/tiendas
*/

const { Router } = require('express');
const { getTiendas, crearTienda, actualizarTienda } = require('../controllers/tiendas'); 

const router = Router();

router.get('/', getTiendas );

router.post('/', crearTienda );

router.put('/:id', actualizarTienda );

module.exports = router;