'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      name: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'PRIVATE_SUPERVISOR',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'PUBLIC_SUPERVISOR',
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
