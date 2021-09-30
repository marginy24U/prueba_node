'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Libro', {
      id_libro: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING(48)
      },
      descripcion: {
        type: Sequelize.STRING(200)
      },
      stock: {
        type: Sequelize.INTEGER(5)
      },
      minimo: {
        type: Sequelize.INTEGER(3)
      },
      precio: {
        type: Sequelize.DECIMAL(7,2)
      },
      ubicacion: {
        type: Sequelize.STRING(200)
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categoria',
          key: 'id_categoria',

          hooks: true, 
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
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
    await queryInterface.dropTable('Libro');
  }
};