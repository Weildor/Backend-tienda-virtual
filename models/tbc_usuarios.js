'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbc_Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbc_Usuario.init({
    nombre: {
      type:DataTypes.STRING(100),
      allowNull:false
    },
    direccion: {
      type:DataTypes.STRING(100),
      allowNull:false
    },
    telefono: {
      type: DataTypes.STRING(150),
      allowNull:false
    },
    email: {
      type: DataTypes.STRING(15),
      allowNull:false
    },
    password: {
      type: DataTypes.STRING(120),
      allowNull:false
    },
    rol:{
      type: DataTypes.ENUM('admin', 'cliente'),
      allowNUll:false,
      defaultValue: 'cliente'
    },
    fecha_registro: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tbc_Usuario',
  });
  return tbc_Usuario;
};
/*'use strict';
/** @type {import('sequelize-cli').Migration} */
/*
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbc_usuarios'), {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
nombre:{
      type:DataTypes.STRING(100),
      allowNull:false
    },
    direccion: DataTypes.STRING(150),
    password: DataTypes.STRING(225),
    email: DataTypes.STRING(120),
    telefono: DataTypes.STRING(15),
    rol:{
      type: DataTypes.ENUM('admin','cliente'),
      allowNull:false,
      defaultValue: 'cliente'
    },
    fecha_registro: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tbc_usuarios',
  };
  return tbc_usuarios;
}
    }
*/