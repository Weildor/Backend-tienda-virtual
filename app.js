require('dotenv').config();

const express = require ('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
// 1. Importar la librería cors
const cors = require('cors'); 

const app = express();

// 2. Habilitar CORS (¡Debe ir antes de tus rutas!)
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.get('/', (req, res)=>res.status(200).send({
    message: 'Bienvenido a la API REST de compras.',
}))

// Importar las rutas (eliminé un 'route_categorias' duplicado que tenías)
require('./routes/route_categorias')(app);
require('./routes/route_usuarios')(app);
require('./routes/route_productos')(app);
require('./routes/route_carrito')(app);
require('./routes/route_carrito_detalle')(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

module.exports = app;