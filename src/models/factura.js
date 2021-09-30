'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Factura -> Cliente (N-1)
      Factura.belongsTo(models.Cliente,{
        as: 'Cliente',
        foreignKey: 'id_cliente',
      });
      
      // Factura -> Usuario (N-1)
      Factura.belongsTo(models.Usuario,{
        as: 'Usuario',
        foreignKey: 'id_usuario',
      });
      
      // Cliente -> Factura_Detalle (1-N)
      Factura.hasMany(models.Factura_Detalle,{
        as: 'Factura_Detalle',
        foreignKey: 'id_factura',
      });
      
    }
  };
  Factura.init({
    id_factura: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    id_usuario: DataTypes.INTEGER,
    id_cliente: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    monto: DataTypes.DECIMAL,
    credito: DataTypes.STRING,
    nruc: DataTypes.STRING,
    nombre_cliente: DataTypes.STRING,
    fecha_venc: DataTypes.DATE,
    iva: DataTypes.DECIMAL,
    num_factura: DataTypes.INTEGER,
    anulada: DataTypes.STRING,
    tcambio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Factura',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Factura;
};