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
    static associate({Category}) {
      // define association here
      this.belongsTo(Category, {
        foreignKey: 'categoryID',
        as: 'category'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    quality: DataTypes.STRING,
    description: DataTypes.STRING,
    categoryID: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'produtcs',
    modelName: 'Product',
  });
  return Product;
};