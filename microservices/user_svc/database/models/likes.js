'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    static associate(models) {
      likes.belongsTo(models.users ,{
        foreignKey: 'userId'
      });
      likes.belongsTo(models.posts ,{
        foreignKey: 'postId'
      });
    }
  }

  likes.init({
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
    modelName: 'likes'
  });

  return likes;
};