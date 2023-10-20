'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, Order}) {
      // define association here
      this.belongsTo(Product, {
        foreignKey: 'productId',
        as: 'product'
      })

      this.belongsToMany(Order, {through: 'orderItem'})
    }
  }
  OrderItem.init({
    quantity: DataTypes.STRING,
    productId: DataTypes.STRING,
    orderId: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'orderItems',
    modelName: 'OrderItem',
  });
  return OrderItem;
};