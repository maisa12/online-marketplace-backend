'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ads',
    {
      id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
      },
      name:{
         type: Sequelize.STRING,
         allowNull: false
       },
       author:{
        type: Sequelize.BIGINT,
        allowNull: false
      },
       category:{
         type: Sequelize.STRING,
         allowNull: false
       },
       description:{
         type: Sequelize.TEXT,
         allowNull: false
       },
       picture:{
           type: Sequelize.TEXT,
           allowNull: false
       },
       price:{
          type: Sequelize.DECIMAL(20, 2),
          allowNull: false
       },
       active:{
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
