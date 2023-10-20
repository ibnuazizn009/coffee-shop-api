'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('orderItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(25)
      },
      quantity: {
        type: DataTypes.INTEGER(5)
      },
      productId: {
        allowNull: false,
        type: DataTypes.STRING(25),
        references: {
          model: 'products',
          key: 'id'
        }
      },
      orderId: {
        allowNull: false,
        type: DataTypes.STRING(25),
        references: {
          model: 'orders',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('orderItems');
  }
};