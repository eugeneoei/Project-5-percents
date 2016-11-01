'use strict';
module.exports = function(sequelize, DataTypes) {
  var poll = sequelize.define('poll', {
    userId: DataTypes.INTEGER,
    poll_category: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.poll.belongsTo(models.user);
        models.poll.hasMany(models.option);

      }
    }
  });
  return poll;
};
