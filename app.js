require('dotenv').config();

const express = require ('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
//Tipo de servidor que realizaremos
const http = require('http');
//Iniciar y configurar express
const app = express();
//Log mostrar informacion en consola
app.use(logger('dev'));
//Parsear las entradas de solicitud de dastos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
//Configurar las rutas de bienvenida al servidor
app.get('/', (req, res)=>res.status(200).send({
    message: 'Bienvenido a la API REST de compras.',
}))
//creando rutas
require('./routes/route_categorias')(app);
// Importar las rutas
require('./routes/route_categorias')(app);
require('./routes/route_usuarios')(app);
require('./routes/route_productos')(app);
require('./routes/route_carrito')(app);
require('./routes/route_carrito_detalle')(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

module.exports = app;