'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('postImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        constraint: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        defaultValue: null,
        references: {
          model: 'posts',
          key: 'id'
        }
      },
      postRequestId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'postRequests',
          key: 'id'
        }
      },
      adId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        constraint: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        defaultValue: null,
        references: {
          model: 'ads',
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
    await queryInterface.dropTable('postImages');
  }
};