'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Materia_Prima', {
      id_materia: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(22)
      },
      descripcion: {
        type: Sequelize.STRING(200)
      },
      unidad: {
        type: Sequelize.STRING(20)
      },
      stock: {
        type: Sequelize.INTEGER(5)
      },
      minimo: {
        type: Sequelize.INTEGER(3)
      },
      ubicacion: {
        type: Sequelize.STRING(200)
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
    await queryInterface.dropTable('Materia_Prima');
  }
};