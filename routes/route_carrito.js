const carritosController = require('../controllers/controller_carrito');

module.exports = (app) => {
    app.get('/api/carritos', carritosController.list);
    app.get('/api/carrito/:id', carritosController.find); // Para ver un carrito específico
    app.post('/api/carritos', carritosController.create);
    app.put('/api/carrito/:id', carritosController.update); // Por si quieres cambiar el usuario asignado
    app.delete('/api/carrito/:id', carritosController.delete); // Para vaciar/borrar el carrito
};
/*
const carritosController = require('../controllers/controller_carrito');

module.exports = (app) => {
    app.post('/api/carritos', carritosController.create);
    app.get('/api/carritos', carritosController.list);
};
*/