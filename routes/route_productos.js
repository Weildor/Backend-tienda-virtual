const productosController = require('../controllers/controller_productos');

module.exports = (app) => {
    app.get('/api/productos', productosController.list);
    app.get('/api/producto/:id', productosController.find);
    app.post('/api/producto', productosController.create);
    app.put('/api/producto/:id', productosController.update);
    app.delete('/api/producto/:id', productosController.delete);
}
/*
const productosController = require('../controllers/controller_productos');

module.exports = (app) => {
    app.post('/api/productos', productosController.create);
    app.get('/api/productos', productosController.list);
};
*/