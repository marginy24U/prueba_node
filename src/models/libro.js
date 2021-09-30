'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Libro extends Model {
    static associate(models) {
      // Libro -> Categoria (N-1)
      Libro.belongsTo(models.Categoria,{
        as: 'Categoria',
        foreignKey: 'id_categoria',
      });
      
      // Libro -> Agenda_Produccion (1-N)
      Libro.hasMany(models.Agenda_Produccion,{
        as: 'Agenda_Produccion',
        foreignKey: 'id_libro',
      });
      
      // Libro -> Remision_Detalle (1-N)
      Libro.hasMany(models.Remision_Detalle,{
        as: 'Remision_Detalle',
        foreignKey: 'id_libro',
      });
    }
  };
  Libro.init({
    id_libro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    minimo: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL,
    ubicacion: DataTypes.STRING,
    id_categoria: DataTypes.INTEGER,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Libro',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Libro;
};