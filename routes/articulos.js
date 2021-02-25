/*
    /api/articulos
*/

const { Router } = require('express');
const { getArticulos, crearArticulo, eliminarArticulo } = require('../controllers/articulos'); 

const router = Router();

router.get('/', getArticulos );

router.post('/', crearArticulo );

router.delete('/:id', eliminarArticulo );


module.exports = router;