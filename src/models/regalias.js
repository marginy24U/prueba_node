'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Regalias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Regalias -> Producto (N-1)
      Regalias.belongsTo(models.Producto,{
        as: 'Producto',
        foreignKey: 'id_producto',
			});
    }
  };
  Regalias.init({
    id_regalia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    id_producto: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Regalias',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Regalias;
};