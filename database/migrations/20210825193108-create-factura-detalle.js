'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Factura_Detalle', {
      id_factura_detalle: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_factura: {
        type: Sequelize.INTEGER,
        references: {
          model: 'factura',
          key: 'id_factura',
          hooks: true, 
        },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE',
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
      precio: {
        type: Sequelize.DECIMAL(7,2)
      },
      porcentaje: {
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
    await queryInterface.dropTable('Factura_Detalle');
  }
};