'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class bans extends Model {
    static associate(models) {
      bans.belongsTo(models.users ,{
        foreignKey: 'userId'
      });
    }
  }

  bans.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'bans'
  });

  return bans;
};