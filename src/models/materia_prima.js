'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Materia_Prima extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // Materia_Prima -> Solicitud_Compra (1-N)
      Materia_Prima.hasMany(models.Solicitud_Compra,{
        as: 'Solicitud_Compra',
        foreignKey: 'id_material',
      });
    }
  };
  Materia_Prima.init({
    id_materia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    unidad: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    minimo: DataTypes.INTEGER,
    ubicacion: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Materia_Prima',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Materia_Prima;
};