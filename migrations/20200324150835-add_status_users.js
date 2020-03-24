'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'status', {type: Sequelize.STRING,
      allowNull: false});
  },

  down: (queryInterface, Sequelize) => {
   return  queryInterface.dropTable('users')
  }
};
