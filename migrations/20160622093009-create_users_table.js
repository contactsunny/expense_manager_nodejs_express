'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          // defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
            notEmpty: true
          }
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      },
      {
        indexes: [{unique: true, fields: ['email']}]
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('users')
  }
};
