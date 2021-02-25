/*
    /api/articulos
*/

const { Router } = require('express');
const { getArticulos, crearArticulo, eliminarArticulo, actualizarArticulo } = require('../controllers/articulos'); 

const router = Router();

router.get('/', getArticulos );

router.post('/', crearArticulo );

router.delete('/:id', eliminarArticulo );

router.put('/:id', actualizarArticulo );


module.exports = router;