const detalleController = require('../controllers/controller_carrito_detalle');

module.exports = (app) => {
    app.get('/api/detalles', detalleController.list);
    app.get('/api/detalle/:id', detalleController.find);
    app.post('/api/detalles', detalleController.create);
    app.put('/api/detalle/:id', detalleController.update); // ¡Vital para cambiar la cantidad de piezas!
    app.delete('/api/detalle/:id', detalleController.delete); // ¡Vital para eliminar un producto del carrito!
};
/*
const detalleController = require('../controllers/controller_carrito_detalle');

module.exports = (app) => {
    app.post('/api/detalles', detalleController.create);
    app.get('/api/detalles', detalleController.list);
};
*/