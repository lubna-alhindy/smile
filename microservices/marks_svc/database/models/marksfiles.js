'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class marksfiles extends Model {
    static associate(models) {
      marksfiles.belongsTo(models.subjects ,{
        foreignKey: "subjectId"
      });
    }
  }
  marksfiles.init({
    subjectId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'marksfiles',
  });
  return marksfiles;
};