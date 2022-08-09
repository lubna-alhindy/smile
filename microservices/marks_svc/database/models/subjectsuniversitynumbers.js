'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subjectsuniversitynumbers extends Model {
    static associate(models) {
      subjectsuniversitynumbers.belongsTo(models.subjects ,{
        foreignKey: "subjectId"
      });
      subjectsuniversitynumbers.belongsTo(models.universitynumbers ,{
        as: "universityNumber",
        foreignKey: "universityNumberId"
      });
    }
  }
  subjectsuniversitynumbers.init({
    universityNumberId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    mark: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subjectsuniversitynumbers',
  });
  return subjectsuniversitynumbers;
};