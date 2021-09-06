'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Regalias', {
      id_regalia: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_producto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'producto',
          key: 'id_producto',
          hooks: true, 
        },
        onDelete: 'NO ACTION' ,
        onUpdate: 'NO ACTION',
      },
      cantidad: {
        type: Sequelize.INTEGER(5)
      },
      descripcion: {
        type: Sequelize.STRING(200)
      },
      fecha: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Regalias');
  }
};