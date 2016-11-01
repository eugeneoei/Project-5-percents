'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('polls', [
        {
            userId: 2,
            poll_category: 'Photography',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            userId: 2,
            poll_category: 'Headphones',
            createdAt: new Date(),
            updatedAt: new Date()
        }

    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('polls', null, {});
  }
};
