'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      posts.belongsTo(models.users,{
        foreignKey: 'userId',
      });
      posts.hasMany(models.postImages,{
        foreignKey: 'postRequestId',
      });
      posts.hasMany(models.comments,{
        foreignKey: 'postId',
      });
      posts.hasMany(models.likes ,{
        foreignKey: 'postId',
      });
      posts.hasMany(models.favorites ,{
        foreignKey: 'postId',
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
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};