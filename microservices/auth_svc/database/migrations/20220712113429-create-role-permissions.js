'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rolePermissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permissionName: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "permissions",
          key: 'name',
        }
      },
      roleName: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "roles",
          key: 'name',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rolePermissions');
  }
};