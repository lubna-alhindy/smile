'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class postImages extends Model {
    static associate(models) {
      postImages.belongsTo(models.ads,{
        foreignKey: 'adId'
      });
      postImages.belongsTo(models.posts,{
        foreignKey: 'postId'
      });
      postImages.belongsTo(models.postRequests,{
        foreignKey: 'postRequestId'
      });
    }
  }

  postImages.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    postRequestId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'postRequests',
        key: 'id'
      }
    },
    adId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ads',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'postImages'
  });

  return postImages;
};