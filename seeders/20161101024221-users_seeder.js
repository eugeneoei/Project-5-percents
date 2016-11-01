'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
        {
            first_name: 'Peter',
            last_name: 'Tan',
            email: 'peter@email.com',
            is_admin: true,
            password: 'peter@email.com',
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
