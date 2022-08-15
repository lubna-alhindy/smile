'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    static associate(models) {
      notifications.belongsTo(models.users ,{
        foreignKey: 'userId'
      });
    }
  }
  notifications.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'notifications',
  });
  return notifications;
};