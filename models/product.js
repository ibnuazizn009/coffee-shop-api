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

    toJSON() {
      return { ...this.get(), categoryID: undefined }
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
    tableName: 'products',
    modelName: 'Product',
  });
  
  return Product;
};