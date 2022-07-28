'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class quizRequests extends Model {
    static associate(models) {
      quizRequests.belongsTo(models.subjects ,{
        foreignKey: "subjectId"
      });
    }
  }
  quizRequests.init({
    subjectId: DataTypes.INTEGER,
    question: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'quizRequests',
  });
  return quizRequests;
};