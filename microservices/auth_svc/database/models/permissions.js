'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    static associate(models) {
      permissions.hasMany(models.rolePermissions ,{
        foreignKey: "permissionName"
      });
    }
  }
  permissions.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'permissions',
  });
  return permissions;
};