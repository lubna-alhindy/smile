'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    modelName: 'ads',
  });
  return ads;
};