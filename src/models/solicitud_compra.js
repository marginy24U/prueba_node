'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Solicitud_Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Solicitud_Compra -> Usuario (N-1)
      Solicitud_Compra.belongsTo(models.Usuario,{
        as: 'Usuario',
        foreignKey: 'id_usuario',
      });
      
      // Solicitud_Compra -> Materia_Prima (N-1)
      Solicitud_Compra.belongsTo(models.Materia_Prima,{
        as: 'Materia_Prima',
        foreignKey: 'id_material',
      });
      
    }
  };
  Solicitud_Compra.init({
    id_solicitud: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    id_material: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    fecha_solicitud: DataTypes.DATE,
    prioridad: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Solicitud_Compra',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Solicitud_Compra;
};