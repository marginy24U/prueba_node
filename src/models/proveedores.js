'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proveedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Proveedores.init({
    id_proveedor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    nombre_contacto: DataTypes.STRING,
    email: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Proveedores',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Proveedores;
};