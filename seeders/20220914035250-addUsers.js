const { hashSync } = require('bcrypt')
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = require('../data/user.json')
    users.forEach(el => {
    el.password = hashSync(el.password, 10)
    el.createdAt = el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Users', users, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
