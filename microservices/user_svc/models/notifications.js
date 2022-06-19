'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    static associate(models) {
      notifications.belongsTo(models.users,{
        foreignKey: 'userId'
      });
    }
  }

  notifications.init({
    title:{
      type: DataTypes.STRING,
      allowNull: true
    },
    body:{
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    isRead:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'notifications'
  });

  return notifications;
};