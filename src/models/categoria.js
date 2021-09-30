'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    
    static associate(models) {
      // Categoria -> Libro (1-N)
      Categoria.hasMany(models.Libro,{
        as: 'Libro',
        foreignKey: 'id_libro',
      });
      
    }
  };
  Categoria.init({
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Categoria',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Categoria;
};