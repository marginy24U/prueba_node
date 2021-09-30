'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {

    static associate(models) {
      // Producto -> Factura_Detalle (1-N)
      Producto.hasMany(models.Factura_Detalle,{
        as: 'Factura_Detalle',
        foreignKey: 'id_producto',
      });

      // Producto -> Regalias (1-N)
      Producto.hasMany(models.Regalias,{
        as: 'Regalias',
        foreignKey: 'id_regalias',
      });
    }
  };
  Producto.init({
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    stock: DataTypes.STRING,
    minimo: DataTypes.INTEGER,
    costo_impo: DataTypes.DECIMAL,
    precio1: DataTypes.DECIMAL,
    precio2: DataTypes.DECIMAL,
    precio3: DataTypes.DECIMAL,
    precio4: DataTypes.DECIMAL,
    comision1: DataTypes.INTEGER,
    comision2: DataTypes.INTEGER,
    comision3: DataTypes.INTEGER,
    comision4: DataTypes.INTEGER,
    linea: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Producto;
};