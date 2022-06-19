'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class complaints extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      complaints.belongsTo(models.users ,{
        foreignKey: 'userId'
      });
    }
  }
  complaints.init({
    title:{
      type: DataTypes.STRING,
      allowNull: true
    },
    body:{
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    isDone:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'complaints',
  });
  return complaints;
};