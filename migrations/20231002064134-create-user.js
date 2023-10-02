'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(25)
      },
      fullname: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(25)
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255)
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
    await queryInterface.dropTable('users');
  }
};