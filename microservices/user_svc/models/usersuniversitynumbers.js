'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersUniversityNumbers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usersUniversityNumbers.belongsTo(models.users, {
        foreignKey: 'userId',
      });
    }
  }
  usersUniversityNumbers.init({
    universityNumber:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year:{ // yyyy/yyyy
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usersUniversityNumbers',
  });
  return usersUniversityNumbers;
};