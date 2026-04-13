const { tbc_categorias } = require('../models'); 

module.exports = {
    create(req, res){
        return tbc_categorias
            .create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion // Añadido descripción
            })
            .then(categoria => res.status(201).send(categoria)) 
            .catch(error => res.status(400).send(error));
    },
    
    list(_, res){
        return tbc_categorias.findAll({})
            .then(categorias => res.status(200).send(categorias))
            .catch(error => res.status(400).send(error));
    },
    
    find(req, res){
        // Cambiado a findByPk y usando req.params.id
        return tbc_categorias.findByPk(req.params.id)
            .then(categoria => {
                if (!categoria) {
                    return res.status(404).send({ message: "Categoría no encontrada" });
                }
                return res.status(200).send(categoria);
            })
            .catch(error => res.status(400).send(error));
    },
    
    delete(req, res){
        return tbc_categorias.destroy({
            where: { id: req.params.id }
        })
        .then(() => res.status(200).send({message: "Categoría eliminada correctamente"}))
        .catch(error => res.status(400).send(error));
    },
    
    update(req, res){
        return tbc_categorias.update(
            {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion // Añadido descripción
            },
            {
                where: { id: req.params.id }
            }
        )
        .then(() => res.status(200).send({message: "Categoría actualizada correctamente"}))
        .catch(error => res.status(400).send(error));
    }
};
/*
// Importamos directamente el modelo desde la carpeta models.
// NOTA: Asegúrate de que 'tbc_categorias' sea el nombre exacto con el que 
// se exporta tu modelo. Si falla, podría llamarse 'tbc_categoria' o 'Categoria'.
const { tbc_categorias } = require('../models'); 

module.exports = {
    create(req, res){
        return tbc_categorias
            .create({
                nombre: req.body.nombre
            })
            // Cambié a 201 (Created) que es el estándar cuando creas un recurso nuevo
            .then(categoria => res.status(201).send(categoria)) 
            .catch(error => res.status(400).send(error));
    },
    
    list(_, res){
        return tbc_categorias.findAll({})
            .then(categorias => res.status(200).send(categorias))
            .catch(error => res.status(400).send(error));
    },
    
    find(req, res){
        return tbc_categorias.findAll({
            where: {
                nombre: req.params.nombre,
            }
        })
        .then(categoria => res.status(200).send(categoria))
        .catch(error => res.status(400).send(error));
    },
    
    delete(req, res){
        return tbc_categorias.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).send({message: "Categoría eliminada correctamente"}))
        .catch(error => res.status(400).send(error));
    },
    
    update(req, res){
        return tbc_categorias.update(
            {
                nombre: req.body.nombre
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(() => res.status(200).send({message: "Categoría actualizada correctamente"}))
        .catch(error => res.status(400).send(error));
    }
};
*/

/////////////////////////////////////////////////////////////////
/*const Sequelize = require('sequelize');
const categoria = require('../models').categoria;
const categoria = db.tbc_categoria;

module.exports = {
    create(req, res){
        return categoria
            .create({
                nombre: req.body.nombre
            })
            .then(categoria => res.status(200).send(categoria))
            .catch(error => res.status(400).send(error))
    },
    list(_, res){
        return categoria.findAll({})
            .then(categoria => res.status(200).send(categoria))
            .catch(error => res.status(400).send(error))
    },
    find(req, res){
        return categoria.findAll({
            where: {
                nombre: req.params.nombre,
            }
        })
        .then(categoria => res.status(200).send(categoria))
        .catch(error => res.status(400).send(error))
    },
    delete(req, res){
        return categoria.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).send({message:"Categoria eliminada correctamente"}))
        .catch(error => res.status(400).send(error))
    },
    update(req, res){
        return categoria.update(
            {
                nombre: req.body.nombre
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(() => res.status(200).send({message: "Categoia actualizada correctamente"}))
        .catch(error => res.status(400).send(error))
    }
};
*/