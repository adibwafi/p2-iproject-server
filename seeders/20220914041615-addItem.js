'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const items = require('../data/item.json')
    items.forEach(el => {
    el.createdAt = el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Items', items, {})
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
    await queryInterface.bulkDelete('Items', null, {});
  }
};
