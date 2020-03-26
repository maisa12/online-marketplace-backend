'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories',
    {
      id: {
          type: Sequelize.BIGINT,
          autoIncrement: true
      },
      name: {
         type: Sequelize.STRING,
         allowNull: false
       },
       position:{
         type: Sequelize.INTEGER,
         allowNull: false
       },
       slug:{
         type: Sequelize.STRING,
         allowNull: false,
         primaryKey: true
       },
       createdAt: Sequelize.DATE,
       updatedAt: Sequelize.DATE
  }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories')
  }
};
