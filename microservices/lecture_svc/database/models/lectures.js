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
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lectures',
  });
  return lectures;
};