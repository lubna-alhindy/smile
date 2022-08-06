'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lectures extends Model {
    static associate(models) {
      lectures.belongsTo(models.subjects,{
        foreignKey: "subjectId"
      });
    }
  }
  lectures.init({
    subjectId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    year: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lectures',
  });
  return lectures;
};