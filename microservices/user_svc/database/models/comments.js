'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    static associate(models) {
      comments.belongsTo(models.users ,{
        foreignKey: 'userId'
      });
      comments.belongsTo(models.posts ,{
        foreignKey: 'postId'
      });
    }
  }

  comments.init({
    body: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
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
    modelName: 'comments'
  });

  return comments;
};