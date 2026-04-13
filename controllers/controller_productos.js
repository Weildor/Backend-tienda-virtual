const { tbb_productos } = require('../models');

module.exports = {
    create(req, res) {
        return tbb_productos.create(req.body)
            .then(producto => res.status(201).send(producto))
            .catch(error => res.status(400).send(error));
    },
    list(_, res) {
        return tbb_productos.findAll()
            .then(productos => res.status(200).send(productos))
            .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        return tbb_productos.findByPk(req.params.id)
            .then(p => p ? res.status(200).send(p) : res.status(404).send({message: 'No encontrado'}))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return tbb_productos.findByPk(req.params.id)
            .then(p => p ? p.update(req.body).then(u => res.status(200).send(u)) : res.status(404).send({message: 'No encontrado'}))
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return tbb_productos.findByPk(req.params.id)
            .then(p => p ? p.destroy().then(() => res.status(204).send()) : res.status(404).send({message: 'No encontrado'}))
            .catch(error => res.status(400).send(error));
    }
};