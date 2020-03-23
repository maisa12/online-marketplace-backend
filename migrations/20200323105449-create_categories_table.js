'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories',
    {
      id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
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
         allowNull: false
       },
       createdAt: Sequelize.DATE,
       updatedAt: Sequelize.DATE
  }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ads')
  }
};
