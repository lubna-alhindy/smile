'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ads extends Model {
    static associate(models) {
      ads.hasMany(models.postImages ,{
        foreignKey: 'adId'
      });
    }
  }

  ads.init({
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    body:{
      type: DataTypes.STRING,
      allowNull: false
    },
    expireIn:{
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ads'
  });

  return ads;
};