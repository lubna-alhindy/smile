'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('postRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: "subjects",
          key: 'id',
        }
      },
      type:{
        type: Sequelize.STRING,
        allowNull: false
      },
      title:{
        type: Sequelize.STRING,
        allowNull: true
      },
      body:{
        type: Sequelize.TEXT("long"),
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        constraint: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: 'users',
          key: 'id'
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
    await queryInterface.dropTable('postRequests');
  }
};