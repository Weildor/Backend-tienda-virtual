const categoriaController = require('../controllers/controller_categorias');

module.exports = (app) => {
    
    app.get('/api/categorias', categoriaController.list);
    app.get('/api/categoria/:id', categoriaController.find);
    app.post('/api/categorias', categoriaController.create);
    app.put('/api/categoria/:id', categoriaController.update);
    app.delete('/api/categoria/:id', categoriaController.delete);
}