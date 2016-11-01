'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'options',
      'userId',
      Sequelize.INTEGER
    )
  },

  down: function (queryInterface, Sequelize) {
    'options',
    'userId',
    Sequelize.INTEGER
  }
};
