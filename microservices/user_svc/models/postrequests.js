'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postRequests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      postRequests.belongsTo(models.users,{
        foreignKey: 'userId',
      });
      postRequests.hasMany(models.postImages,{
        foreignKey: 'postRequestId',
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
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'postRequests',
  });
  return postRequests;
};