'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbb_productos extends Model {
    static associate(models) {
      // Un producto PERTENECE A una categoría
      tbb_productos.belongsTo(models.tbc_categorias, {
        foreignKey: 'id_categoria', // F minúscula
        as: 'categoria'
      });

      // Un producto puede estar en MUCHOS detalles de carrito
      tbb_productos.hasMany(models.tbc_carrito_detalle, {
        foreignKey: 'id_producto',
        as: 'detalles_carrito'
      });
    }
  }
  tbb_productos.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.DECIMAL(10, 2), // Para manejar dinero
    stock: DataTypes.INTEGER,         // Para manejar cantidades enteras
    id_categoria: DataTypes.INTEGER   // Para que coincida con la llave de categorías
  }, {
    sequelize,
    modelName: 'tbb_productos',
  });

  return tbb_productos;
};
/*'use strict';
const {
  Model
} = require('sequelize');
const tbc_carrito_detalle = require('./tbc_carrito_detalle');
module.exports = (sequelize, DataTypes) => {
  class tbb_productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
    static associate(models) {
      // define association here
    }
  }
  tbb_productos.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.STRING,
    stock: DataTypes.STRING,
    id_categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbb_productos',
  });
  tbb_productos.associate = (models) => {
    tbb_productos.hasMany(models.tbc_categorias, {
      ForeignKey: 'id_categoria',
      as: 'tbc_categorias'
    })
  }
  tbc_carrito_detalle.associate = (models) => {
    tbc_carrito_detalle.hasMany(models.tbb_productos, {
      ForeignKey: 'id_productos',
      as: 'tbb_productos'
    })
  }
  return tbb_productos;
};
*/