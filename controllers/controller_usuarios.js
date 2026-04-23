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

    // NUEVO: Método de Login actualizado para devolver el ROL
    login(req, res) {
        const { email, password } = req.body;
        return tbc_Usuario.findOne({ where: { email: email } })
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({ message: 'Usuario no encontrado' });
                }
                if (usuario.password !== password) {
                    return res.status(401).send({ message: 'Contraseña incorrecta' });
                }

                // Opcional: También puedes guardar el rol dentro del payload del token si lo deseas
                const payload = { id: usuario.id, email: usuario.email, rol: usuario.rol };
                const token = jwt.sign(payload, process.env.JWT_SECRET || 'mi_clave_super_secreta', {
                    expiresIn: '24h'
                });

                return res.status(200).send({
                    message: 'Autenticación exitosa',
                    token: token,
                    rol: usuario.rol // 👈 ¡AQUÍ ESTÁ LA CLAVE! Ahora enviamos el rol al frontend
                });
            })
            .catch(error => res.status(400).send(error));
    },

    // Otros métodos...
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