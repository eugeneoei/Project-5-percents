'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
        {
            first_name: 'Peter',
            last_name: 'Tan',
            email: 'peter@email.com',
            is_admin: true,
            password: '$2a$10$niihHBliuSrUgONneVEMzeGFjxwh2LDABNmA5Fr/1Mh7YdtJ8cQn2',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@email.com',
            is_admin: false,
            password: '$2a$10$WgPlFfeBpSVBDYWIFeSF6O4VEz/U8E9Atq8X0TM1SC1ZoJIZrbaJG',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
