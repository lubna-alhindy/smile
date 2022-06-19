'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleName:{
        type: Sequelize.STRING,
        allowNull: false
      },
      firstName:{
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName:{
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false
      },
      birthday:{
        type: Sequelize.DATE,
        allowNull: true
      },
      image:{
        type: Sequelize.STRING,
        allowNull: true
      },
      bio:{
        type: Sequelize.TEXT("long"),
        allowNull: true
      },
      class:{
        type: Sequelize.STRING,
        allowNull: true
      },
      facebookURL:{
        type: Sequelize.STRING,
        allowNull: true
      },
      telegramURL:{
        type: Sequelize.STRING,
        allowNull: true
      },
      gmail:{
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('users');
  }
};