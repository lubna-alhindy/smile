'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subjects extends Model {
    static associate(models) {
      subjects.hasMany(models.lectures ,{
        foreignKey: "subjectId"
      });

      subjects.hasMany(models.summarys ,{
        foreignKey: "subjectId"
      });
    }
  }
  subjects.init({
    name: DataTypes.STRING,
    class: DataTypes.STRING,
    semester: DataTypes.STRING,
    section: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'subjects',
  });
  return subjects;
};