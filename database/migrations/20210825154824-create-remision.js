'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Remision', {
      id_remision: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cliente',
          key: 'id_cliente',

          hooks: true, 
        },
        onDelete: 'NO ACTION' ,
        onUpdate: 'NO ACTION',
      },
      fecha: {
        type: Sequelize.DATE
      },
      monto: {
        type: Sequelize.DECIMAL(7,2)
      },
      cancelado: {
        type: Sequelize.STRING(5)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Remision');
  }
};