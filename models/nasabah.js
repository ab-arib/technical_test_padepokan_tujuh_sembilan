'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nasabah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nasabah.init({
    Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nasabah',
    tableName: 'nasabah'
  });
  nasabah.removeAttribute('id');
  return nasabah;
};