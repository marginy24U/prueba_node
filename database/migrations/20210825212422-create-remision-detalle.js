'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Remision_Detalle', {
      id_remision_detalle: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_remision: {
        type: Sequelize.INTEGER,
        references: {
          model: 'remision',
          key: 'id_remision',

          hooks: true, 
        },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE',
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
      cantidad_entregada: {
        type: Sequelize.INTEGER(5)
      },
      precio: {
        type: Sequelize.DECIMAL(7,2)
      },
      cantidad_pagada: {
        type: Sequelize.INTEGER
      },
      sub_total: {
        type: Sequelize.DECIMAL(10,2)
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
    await queryInterface.dropTable('Remision_Detalle');
  }
};