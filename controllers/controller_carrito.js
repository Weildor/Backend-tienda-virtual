const { tbb_carritos, tbc_carrito_detalle, tbb_productos } = require('../models');

module.exports = {
    // Lista carritos con sus productos
    list(_, res) {
        return tbb_carritos.findAll({
            include: [{
                model: tbc_carrito_detalle,
                as: 'detalles',
                include: [{ model: tbb_productos, as: 'producto' }]
            }]
        })
        .then(carritos => res.status(200).send(carritos))
        .catch(error => res.status(400).send(error));
    },

    // Busca un carrito específico (Evita el crash del servidor)
    async find(req, res) {
        try {
            const carrito = await tbb_carritos.findByPk(req.params.id, {
                include: [{
                    model: tbc_carrito_detalle,
                    as: 'detalles',
                    include: [{ model: tbb_productos, as: 'producto' }]
                }]
            });
            if (!carrito) return res.status(404).send({ message: 'No encontrado' });
            return res.status(200).send(carrito);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    // Crea cabecera y detalle (Cantidad fija en 1)
    async create(req, res) {
        try {
            const nuevoCarrito = await tbb_carritos.create({
                id_usuario: req.body.id_usuario,
                fecha: new Date()
            });
            if (nuevoCarrito) {
                await tbc_carrito_detalle.create({
                    id_carrito: nuevoCarrito.id,
                    id_producto: req.body.id_producto,
                    cantidad: 1 
                });
            }
            return res.status(201).send(nuevoCarrito);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    // Actualiza cabecera y producto del detalle
    async update(req, res) {
        try {
            const carrito = await tbb_carritos.findByPk(req.params.id);
            if (!carrito) return res.status(404).send({ message: 'No encontrado' });

            await carrito.update({ id_usuario: req.body.id_usuario });
            await tbc_carrito_detalle.update(
                { id_producto: req.body.id_producto },
                { where: { id_carrito: req.params.id } }
            );
            return res.status(200).send(carrito);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    // ELIMINACIÓN SEGURA: Borra detalles antes que la cabecera
    async delete(req, res) {
        try {
            await tbc_carrito_detalle.destroy({ where: { id_carrito: req.params.id } });
            const carrito = await tbb_carritos.findByPk(req.params.id);
            if (!carrito) return res.status(404).send({ message: 'No encontrado' });
            await carrito.destroy();
            return res.status(200).send({ message: 'Eliminado correctamente' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};