'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Proveedores', {
      id_proveedor: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(23)
      },
      descripcion: {
        type: Sequelize.STRING(42)
      },
      telefono: {
        type: Sequelize.INTEGER(8)
      },
      nombre_contacto: {
        type: Sequelize.STRING(17)
      },
      email: {
        type: Sequelize.STRING(24)
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
    await queryInterface.dropTable('Proveedores');
  }
};