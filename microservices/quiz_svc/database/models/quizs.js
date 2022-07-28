'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class quizs extends Model {
    static associate(models) {
      quizs.belongsTo(models.subjects ,{
        foreignKey: "subjectId"
      });
    }
  }
  quizs.init({
    subjectId: DataTypes.INTEGER,
    question: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'quizs',
  });
  return quizs;
};