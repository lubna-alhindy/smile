'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usersUniversityNumbers extends Model {
    static associate(models) {
      usersUniversityNumbers.belongsTo(models.users, {
        foreignKey: 'userId'
      });
    }
  }

  usersUniversityNumbers.init({
    universityNumber:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year:{ // yyyy/yyyy
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'usersUniversityNumbers'
  });

  return usersUniversityNumbers;
};