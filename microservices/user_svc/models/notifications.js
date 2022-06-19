'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notifications.belongsTo(models.users,{
        foreignKey: 'userId',
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
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notifications',
  });
  return notifications;
};