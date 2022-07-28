'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class subjects extends Model {
    static associate(models) {
      subjects.hasMany(models.postRequests ,{
        foreignKey: "subjectId"
      });

      subjects.hasMany(models.posts ,{
        foreignKey: "subjectId"
      });
    }
  }
  subjects.init({
    name: DataTypes.STRING,
    class: DataTypes.INTEGER,
    semester: DataTypes.INTEGER,
    section: DataTypes.ENUM('COMMON', 'SOFTWARE_ENGINEERING' ,'ARTIFICIAL_INTELLIGENCE', 'COMPUTER_SYSTEMS_AND_NETWORKING'),
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'subjects',
  });
  return subjects;
};