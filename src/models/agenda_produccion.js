'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Agenda_Produccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Agenda_Produccion -> Libro (N-1)
      Agenda_Produccion.belongsTo(models.Libro,{
        as: 'Libro',
        foreignKey: 'id_libro',
      });
      
      // Agenda_Produccion -> Usuario (N-1)
      Agenda_Produccion.belongsTo(models.Usuario,{
        as: 'Usuario',
        foreignKey: 'id_usuario',
			});
    }
  };
  Agenda_Produccion.init({
    id_agenda: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    fecha: DataTypes.DATE,
    id_libro: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    estado: DataTypes.STRING,
    prioridad: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    fec_pro: DataTypes.DATE,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Agenda_Produccion',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  return Agenda_Produccion;
};