'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('commentVoters', {}, {})
  }
};