/*
    /api/categorias
*/

const { Router } = require('express');
const { getCategorias } = require('../controllers/categorias'); 

const router = Router();

router.get('/', getCategorias );

module.exports = router;