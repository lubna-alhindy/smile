'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      name: 'Student',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Private_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
