'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class favorites extends Model {
    static associate(models) {
      favorites.belongsTo(models.users ,{
        foreignKey: 'userId'
      });
      favorites.belongsTo(models.posts ,{
        foreignKey: 'postId'
      });
    }
  }

  favorites.init({
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
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
    modelName: 'favorites'
  });

  return favorites;
};