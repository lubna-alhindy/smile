'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class complaints extends Model {
    static associate(models) {
      complaints.belongsTo(models.users ,{
        foreignKey: 'userId'
      });
    }
  }

  complaints.init({
    title:{
      type: DataTypes.STRING,
      allowNull: true
    },
    body:{
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    isDone:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    modelName: 'complaints'
  });

  return complaints;
};