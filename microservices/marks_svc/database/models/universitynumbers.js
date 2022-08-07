'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class universitynumbers extends Model {
    static associate(models) {
    }
  }
  universitynumbers.init({
    universityNumber: DataTypes.INTEGER,
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'universitynumbers',
  });
  return universitynumbers;
};