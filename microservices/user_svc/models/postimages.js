'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      postImages.belongsTo(models.ads,{
        foreignKey: 'adId',
      });
      postImages.belongsTo(models.posts,{
        foreignKey: 'postId',
      });
      postImages.belongsTo(models.postRequests,{
        foreignKey: 'postRequestId',
      });
    }
  }
  postImages.init({
    url:{
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: DataTypes.INTEGER,
    postRequestId: DataTypes.INTEGER,
    adId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'postImages',
  });
  return postImages;
};