'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  point.init({
    AccountId: DataTypes.INTEGER,
    TotalPoint: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'point',
    tableName: 'point'
  });
  return point;
};