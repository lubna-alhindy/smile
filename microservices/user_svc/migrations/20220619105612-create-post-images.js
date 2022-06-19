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
      url:{
        type: Sequelize.STRING,
        allowNull: false
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'posts',
          key: 'id'
        }
      },
      postRequestId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'postRequests',
          key: 'id'
        }
      },
      adId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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