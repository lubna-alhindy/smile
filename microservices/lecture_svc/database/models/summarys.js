'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class summarys extends Model {
    static associate(models) {
      summarys.belongsTo(models.subjects,{
        foreignKey: "subjectId"
      });
    }
  }
  summarys.init({
    subjectId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'summarys',
  });
  return summarys;
};