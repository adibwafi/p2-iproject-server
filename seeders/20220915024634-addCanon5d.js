'use strict';
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://camera-spec.p.rapidapi.com/camera/canon/eos5d',
  headers: {
    'X-RapidAPI-Key': '8a6f25d790mshfceb2d850ae5493p125d64jsn500abf72ddcf',
    'X-RapidAPI-Host': 'camera-spec.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
module.exports = {
  async up (queryInterface, Sequelize) {
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
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
