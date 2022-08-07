'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('universitynumbers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      universityNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      year: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('universitynumbers');
  }
};