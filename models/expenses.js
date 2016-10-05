"use strict";

module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define("Expense", {
    id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    expense_name: DataTypes.STRING,
    expense_description: DataTypes.TEXT,
    expense_category: DataTypes.INTEGER,
    expense_amount: DataTypes.FLOAT
  },
  {
  	tableName: 'expenses',
    classMethods:{
      associate:function(models){
        Expense.belongsTo(models.Category, { foreignKey:'expense_category', foreignKeyConstraint:true} );
        Expense.belongsTo(models.User, { foreignKey:'user_id', foreignKeyConstraint:true} );
      }
    }
  });

  return Expense;
};