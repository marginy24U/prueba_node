'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Remision_Detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Remision_Detalle -> Remision (N-1)
      Remision_Detalle.belongsTo(models.Remision,{
        as: 'Remision',
        foreignKey: 'id_remision',
			});
      
      // Remision_Detalle -> Libro (N-1)
      Remision_Detalle.belongsTo(models.Libro,{
        as: 'Libro',
        foreignKey: 'id_libro',
      });
      
    }
  };
  Remision_Detalle.init({
    id_remision_detalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    id_remision: DataTypes.INTEGER,
    id_libro: DataTypes.INTEGER,
    cantidad_entregada: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL,
    cantidad_pagada: DataTypes.INTEGER,
    sub_total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Remision_Detalle',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Remision_Detalle;
};