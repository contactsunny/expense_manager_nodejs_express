"use strict";

module.exports = function(sequelize, DataTypes) {
  var CategoryType = sequelize.define("CategoryType", {
    id: DataTypes.INTEGER,
    category_type_name: DataTypes.STRING
  },
  {
  	tableName: 'category_types',
    classMethods:{
      associate:function(models){
        CategoryType.hasMany(models.Category, { foreignKey:'id', foreignKeyConstraint:true} );
      }
    }
  });

  return CategoryType;
};