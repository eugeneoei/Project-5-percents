'use strict';
module.exports = function(sequelize, DataTypes) {
  var option = sequelize.define('option', {
    image_url: DataTypes.TEXT,
    product_description: DataTypes.TEXT,
    product_retail_price: DataTypes.STRING,
    product_code: DataTypes.STRING,
    pollId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.option.belongsTo(models.poll);

      }
    }
  });
  return option;
};
