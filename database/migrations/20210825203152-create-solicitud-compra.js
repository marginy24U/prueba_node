'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Solicitud_Compra', {
      id_solicitud: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_material: {
        type: Sequelize.INTEGER,
        references: {
          model: 'materia_prima',
          key: 'id_materia',
          hooks: true, 
        },
        onDelete: 'NO ACTION' ,
        onUpdate: 'NO ACTION',
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuario',
          key: 'id_usuario',

          hooks: true, 
        },
        onDelete: 'NO ACTION' ,
        onUpdate: 'NO ACTION',
      },
      cantidad: {
        type: Sequelize.INTEGER(5)
      },
      fecha_solicitud: {
        type: Sequelize.DATE
      },
      prioridad: {
        type: Sequelize.INTEGER(11)
      },
      estado: {
        type: Sequelize.STRING(20)
      },
      descripcion: {
        type: Sequelize.STRING(200)
      },
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Solicitud_Compra');
  }
};