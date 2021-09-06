'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Remision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Remision -> Cliente (1-N)
      Remision.hasMany(models.Cliente,{
        as: 'Cliente',
        foreignKey: 'id_cliente',
      });
      
      // Remision -> Remision_Detalle (1-N)
      Remision.hasMany(models.Remision_Detalle,{
        as: 'Remision_Detalle',
        foreignKey: 'id_remision',
      });
    }
  };
  Remision.init({
    id_remision: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    id_cliente: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    monto: DataTypes.DECIMAL,
    cancelado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Remision',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Remision;
};