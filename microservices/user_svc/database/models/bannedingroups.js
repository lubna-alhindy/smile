'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bannedingroups extends Model {
    static associate(models) {
      bannedingroups.belongsTo(models.users ,{
        foreignKey: 'userId'
      });
    }
  }
  bannedingroups.init({
    userId: DataTypes.INTEGER,
    group: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bannedingroups',
  });
  return bannedingroups;
};