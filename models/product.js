'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category, Order}) {
      // define association here
      this.belongsTo(Category, {
        foreignKey: 'categoryId',
        as: 'category'
      })

      this.belongsToMany(Order, {through: 'orderItem'});
    }

    toJSON() {
      return { ...this.get(), categoryId: undefined }
    }
  }
  Product.init({
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    quality: DataTypes.STRING,
    description: DataTypes.STRING,
    productImage: DataTypes.STRING,
    categoryId: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
  });
  
  return Product;
};