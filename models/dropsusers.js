'use strict';
module.exports = function(sequelize, DataTypes) {
  var dropsUsers = sequelize.define('dropsUsers', {
    dropId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return dropsUsers;
};