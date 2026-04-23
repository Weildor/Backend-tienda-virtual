const { tbc_Usuario } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    // Método para registrar usuarios
    create(req, res) {
        return tbc_Usuario.create(req.body)
            .then(usuario => res.status(201).send(usuario))
            .catch(error => res.status(400).send(error));
    },

    // Método para listar usuarios
    list(_, res) {
        return tbc_Usuario.findAll()
            .then(usuarios => res.status(200).send(usuarios))
            .catch(error => res.status(400).send(error));
    },

    // MÉTODO DE LOGIN CORREGIDO
    login(req, res) {
        return tbc_Usuario
            .findOne({
                where: { email: req.body.email }
            })
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({ message: 'Usuario no encontrado' });
                }

                // Validación de contraseña simple
                if (usuario.password !== req.body.password) {
                    return res.status(401).send({ message: 'Contraseña incorrecta' });
                }

                // Generamos un token real usando la librería jwt
                // Usamos una clave secreta (puedes cambiar 'secreto_super_seguro')
                const token = jwt.sign(
                    { id: usuario.id, rol: usuario.rol }, 
                    'secreto_super_seguro', 
                    { expiresIn: '24h' }
                );

                // ENVIAMOS TODA LA INFORMACIÓN NECESARIA AL FRONTEND
                res.status(200).send({
                    message: 'Autenticación exitosa',
                    token: token,   // Token real generado
                    rol: usuario.rol,
                    id: usuario.id  // El ID que faltaba para filtrar el Carrito
                });
            })
            .catch(error => {
                console.error("Error en login:", error);
                res.status(400).send(error);
            });
    },

    // Otros métodos CRUD
    find(req, res) {
        return tbc_Usuario.findByPk(req.params.id)
            .then(usuario => usuario ? res.status(200).send(usuario) : res.status(404).send({message: 'No encontrado'}))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return tbc_Usuario.findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) return res.status(404).send({message: 'No encontrado'});
                return usuario.update(req.body).then(updated => res.status(200).send(updated));
            }).catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return tbc_Usuario.findByPk(req.params.id)
            .then(usuario => {
                if (!usuario) return res.status(404).send({message: 'No encontrado'});
                return usuario.destroy().then(() => res.status(204).send());
            }).catch(error => res.status(400).send(error));
    }
};