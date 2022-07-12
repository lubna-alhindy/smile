'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class rolePermissions extends Model {
    static associate(models) {
      rolePermissions.belongsTo(models.permissions ,{
        foreignKey: "permissionName"
      });
      rolePermissions.belongsTo(models.roles ,{
        foreignKey: "roleName"
      });
    }
  }
  rolePermissions.init({
    permissionName: DataTypes.STRING,
    roleName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rolePermissions',
  });
  return rolePermissions;
};