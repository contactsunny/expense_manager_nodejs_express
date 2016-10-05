"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    user_group: DataTypes.INTEGER
  },
  {
  	tableName: 'users',
    classMethods:{
      associate:function(models){
        User.hasMany(models.Expense, { foreignKey:'id', foreignKeyConstraint:true} );
      }
    }
  });

  return User;
};