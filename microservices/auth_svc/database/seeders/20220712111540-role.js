'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      name: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
