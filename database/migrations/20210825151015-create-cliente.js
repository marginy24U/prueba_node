'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cliente', {
      id_cliente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(76)
      },
      telefono: {
        type: Sequelize.INTEGER(8)
      },
      direccion: {
        type: Sequelize.STRING(140)
      },
      ciudad: {
        type: Sequelize.STRING(18)
      },
      email: {
        type: Sequelize.STRING(31)
      },
      ruc: {
        type: Sequelize.STRING(20)
      },
      persona_contacto: {
        type: Sequelize.STRING(38)
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
    await queryInterface.dropTable('Cliente');
  }
};