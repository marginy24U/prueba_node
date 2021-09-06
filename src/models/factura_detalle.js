'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Factura_Detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Cliente -> Remision (N-1)
      Factura_Detalle.belongsTo(models.Factura,{
        as: 'Factura',
        foreignKey: 'id_factura',
			});
      
      // Cliente -> Remision (N-1)
      Factura_Detalle.belongsTo(models.Producto,{
        as: 'Producto',
        foreignKey: 'id_producto',
      });
      
    }
  };
  Factura_Detalle.init({
    id_factura_detalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    id_factura: DataTypes.INTEGER,
    id_producto: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    precio: DataTypes.INTEGER,
    porcentaje: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Factura_Detalle',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Factura_Detalle;
};