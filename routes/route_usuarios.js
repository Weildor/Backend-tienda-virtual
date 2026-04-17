const usuariosController = require('../controllers/controller_usuarios');

module.exports = (app) => {
    // Rutas de CRUD
    app.get('/api/usuarios', usuariosController.list);
    app.get('/api/usuario/:id', usuariosController.find);
    app.post('/api/usuarios', usuariosController.create);
    app.put('/api/usuario/:id', usuariosController.update);
    app.delete('/api/usuario/:id', usuariosController.delete);

    // Ruta de Autenticación para generar el Token
    app.post('/api/login', usuariosController.login);
};
