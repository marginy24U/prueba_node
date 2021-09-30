'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Usuario -> Solicitud_Compra (1-N)
      Usuario.hasMany(models.Solicitud_Compra,{
        as: 'Solicitud_Compra',
        foreignKey: 'id_usuario',
      });

      // Usuario -> Factura (1-N)
      Usuario.hasMany(models.Factura,{
        as: 'Factura',
        foreignKey: 'id_usuario',
      });
      // Usuario -> Agenda_Produccion (1-N)
      Usuario.hasMany(models.Agenda_Produccion,{
        as: 'Agenda_Produccion',
        foreignKey: 'id_usuario',
      });
    }
  };
  Usuario.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false,
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    nick: DataTypes.STRING,
    pass: DataTypes.STRING,
    cargo: DataTypes.STRING,
    permiso: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
    freezeTableName: true,  // La tabla tendra el mismo nombre que el modelo
    timestamps: false,
  });
  
//   Usuario.All = async() => {
//     let data = await Usuario.findAll({
//         raw : true 
//     });
    
//     return data
// }
  
  
  return Usuario;
};