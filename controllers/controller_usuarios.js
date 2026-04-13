const { tbc_Usuario } = require('../models');

module.exports = {
    create(req, res) {
        return tbc_Usuario.create(req.body)
            .then(usuario => res.status(201).send(usuario))
            .catch(error => res.status(400).send(error));
    },
    list(_, res) {
        return tbc_Usuario.findAll()
            .then(usuarios => res.status(200).send(usuarios))
            .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        return tbc_Usuario.findByPk(req.params.id)
            .then(usuario => usuario ? res.status(200).send(usuario) : res.status(404).send({message: 'No encontrado'}))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return tbc_Usuario.findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) return res.status(404).send({message: 'No encontrado'});
                return usuario.update(req.body)
                    .then(updated => res.status(200).send(updated));
            })
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return tbc_Usuario.findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) return res.status(404).send({message: 'No encontrado'});
                return usuario.destroy()
                    .then(() => res.status(204).send());
            })
            .catch(error => res.status(400).send(error));
    }
};