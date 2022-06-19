'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class postRequests extends Model {
    static associate(models) {
      postRequests.belongsTo(models.users,{
        foreignKey: 'userId'
      });
      postRequests.hasMany(models.postImages,{
        foreignKey: 'postRequestId'
      });
    }
  }

  postRequests.init({
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
    modelName: 'postRequests'
  });

  return postRequests;
};