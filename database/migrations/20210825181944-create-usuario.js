'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuario', {
      id_usuario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(20)
      },
      apellido: {
        type: Sequelize.STRING(20)
      },
      nick: {
        type: Sequelize.STRING(20)
      },
      pass: {
        type: Sequelize.STRING(60)
      },
      cargo: {
        type: Sequelize.STRING(20)
      },
      permiso: {
        type: Sequelize.STRING(15)
      },
      estado: {
        type: Sequelize.INTEGER(1)
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
    await queryInterface.dropTable('Usuario');
  }
};