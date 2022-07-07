'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    static associate(models) {
      posts.belongsTo(models.users,{
        foreignKey: 'userId'
      });
      posts.hasMany(models.postImages,{
        foreignKey: 'postId'
      });
      posts.hasMany(models.comments,{
        foreignKey: 'postId'
      });
      posts.hasMany(models.likes ,{
        foreignKey: 'postId'
      });
      posts.hasMany(models.favorites ,{
        foreignKey: 'postId'
      });
    }
  }

  posts.init({
    subjectId:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type:{
      type: DataTypes.STRING,
      allowNull: false
    },
    title:{
      type: DataTypes.STRING,
      allowNull: true
    },
    body:{
      type: DataTypes.TEXT("long"),
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
    modelName: 'posts'
  });

  return posts;
};