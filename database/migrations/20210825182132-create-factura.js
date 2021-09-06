'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Factura', {
      id_factura: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuario',
          key: 'id_usuario',

          hooks: true, 
        },
        onDelete: 'NO ACTION' ,
        onUpdate: 'NO ACTION',
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
      credito: {
        type: Sequelize.STRING(5)
      },
      nruc: {
        type: Sequelize.STRING(20)
      },
      nombre_cliente: {
        type: Sequelize.STRING(30)
      },
      fecha_venc: {
        type: Sequelize.DATE
      },
      iva: {
        type: Sequelize.DECIMAL(7,2)
      },
      num_factura: {
        type: Sequelize.INTEGER(11)
      },
      anulada: {
        type: Sequelize.STRING(20)
      },
      tcambio: {
        type: Sequelize.STRING(10)
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
    await queryInterface.dropTable('Factura');
  }
};