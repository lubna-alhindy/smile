'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasOne(models.bans ,{
        foreignKey: 'userId'
      });
      users.hasMany(models.usersUniversityNumbers ,{
        foreignKey: 'userId'
      });
      users.hasMany(models.complaints ,{
        foreignKey: 'userId'
      });
      users.hasMany(models.notifications ,{
        foreignKey: 'userId'
      });
      users.hasMany(models.posts ,{
        foreignKey: 'userId'
      });
      users.hasMany(models.postRequests ,{
        foreignKey: 'userId'
      });
      users.hasMany(models.comments,{
        foreignKey: 'userId'
      });
      users.hasMany(models.likes ,{
        foreignKey: 'userId'
      });
      users.hasMany(models.favorites ,{
        foreignKey: 'userId'
      });
      users.hasMany(models.bannedingroups ,{
        foreignKey: 'userId'
      });
      users.hasMany(models.notifications ,{
        foreignKey: 'userId'
      });
    }
  }

  users.init({
    roleName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday:{
      type: DataTypes.DATE,
      allowNull: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    bio:{
      type: DataTypes.TEXT("long"),
      allowNull: true
    },
    class:{
      type: DataTypes.STRING,
      allowNull: true
    },
    facebookURL:{
      type: DataTypes.STRING,
      allowNull: true
    },
    telegramURL:{
      type: DataTypes.STRING,
      allowNull: true
    },
    gmail:{
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'users'
  });

  return users;
};