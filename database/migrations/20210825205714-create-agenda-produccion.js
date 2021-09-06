'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Agenda_Produccion', {
      id_agenda: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      id_libro: {
        type: Sequelize.INTEGER,
        references: {
          model: 'libro',
          key: 'id_libro',

          hooks: true, 
        },
        onDelete: 'NO ACTION' ,
        onUpdate: 'NO ACTION',
      },
      cantidad: {
        type: Sequelize.INTEGER(5)
      },
      descripcion: {
        type: Sequelize.STRING(100)
      },
      estado: {
        type: Sequelize.STRING(10)
      },
      prioridad: {
        type: Sequelize.INTEGER
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
      fec_pro: {
        type: Sequelize.DATE
      },
      cantidad_pro: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Agenda_Produccion');
  }
};