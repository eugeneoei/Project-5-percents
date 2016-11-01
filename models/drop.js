'use strict';
module.exports = function(sequelize, DataTypes) {
  var drop = sequelize.define('drop', {
    image_url: DataTypes.TEXT,
    product_code: DataTypes.STRING,
    product_description: DataTypes.TEXT,
    product_discount_price: DataTypes.STRING,
    product_category: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.drop.belongsToMany(models.user, {through: "dropsUsers"})
      }
    }
  });
  return drop;
};
