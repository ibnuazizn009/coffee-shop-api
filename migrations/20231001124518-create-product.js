'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(25)
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER(10)
      },
      quality: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      categoryID: {
        type: DataTypes.STRING(25),
        allowNull: false,
        references: {
          model: 'categories',
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
    await queryInterface.dropTable('Products');
  }
};