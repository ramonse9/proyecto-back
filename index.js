require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use( cors() );

app.use( express.json() );

app.use( morgan('dev') );

app.use('/api/tiendas', require('./routes/tiendas') );

app.use('/api/articulos', require('./routes/articulos'));

app.use('/api/inventario', require('./routes/inventario'));

app.use('/api/categorias', require('./routes/categorias'));


const puerto = process.env.PORT || 3000

app.listen( puerto, () => {
    console.log(`Servidor corriendo en puerto ${ puerto } `);
})