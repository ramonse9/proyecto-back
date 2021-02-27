require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const path = require('path');

const app = express();

app.use( express.static('public') );

app.use( cors() );

app.use( express.json() );

app.use( morgan('dev') );

app.use('/api/tiendas', require('./routes/tiendas') );

app.use('/api/articulos', require('./routes/articulos'));

app.use('/api/inventario', require('./routes/inventario'));

app.use('/api/categorias', require('./routes/categorias'));

app.get( '*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html') )

})

const puerto = process.env.PORT || 3000

app.listen( puerto, () => {
    console.log(`Servidor corriendo en puerto ${ puerto } `);
})