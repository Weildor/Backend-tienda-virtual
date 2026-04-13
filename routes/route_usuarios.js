const usuariosController = require('../controllers/controller_usuarios');

module.exports = (app) => {
    app.get('/api/usuarios', usuariosController.list);
    app.get('/api/usuario/:id', usuariosController.find); // O por email si prefieres
    app.post('/api/usuarios', usuariosController.create);
    app.put('/api/usuario/:id', usuariosController.update);
    app.delete('/api/usuario/:id', usuariosController.delete);
}
/*const usuariosController = require('../controllers/controller_usuarios');

module.exports = (app) => {
    // Ruta para crear un usuario (POST)
    app.post('/api/usuarios', usuariosController.create);
    
    // Ruta para ver todos los usuarios (GET)
    app.get('/api/usuarios', usuariosController.list);
};
*/