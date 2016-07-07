"use strict";

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    id: DataTypes.INTEGER,
    category_name: DataTypes.STRING,
    category_type: DataTypes.INTEGER
  },
  {
  	tableName: 'categories'
  });

  return Category;
};