'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Producto', {
      id_producto: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marca: {
        type: Sequelize.STRING(30)
      },
      modelo: {
        type: Sequelize.STRING(43)
      },
      stock: {
        type: Sequelize.INTEGER(8)
      },
      minimo: {
        type: Sequelize.INTEGER(6)
      },
      costo_impo: {
        type: Sequelize.DECIMAL(7,2)
      },
      precio1: {
        type: Sequelize.DECIMAL(7,2)
      },
      precio2: {
        type: Sequelize.DECIMAL(7,2)
      },
      precio3: {
        type: Sequelize.DECIMAL(7,2)
      },
      precio4: {
        type: Sequelize.DECIMAL(7,2)
      },
      comision1: {
        type: Sequelize.INTEGER
      },
      comision2: {
        type: Sequelize.INTEGER
      },
      comision3: {
        type: Sequelize.INTEGER
      },
      comision4: {
        type: Sequelize.INTEGER
      },
      linea: {
        type: Sequelize.STRING(50)
      },
      descripcion: {
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
    await queryInterface.dropTable('Producto');
  }
};