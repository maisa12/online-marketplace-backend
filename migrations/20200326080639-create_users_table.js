'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
      },
      name_lastname: {
         type: Sequelize.STRING,
         allowNull: false
       },
       status: {
          type: Sequelize.STRING,
          allowNull: false
       },
       email:{
         type: Sequelize.TEXT,
         allowNull: false
       },
       phone_number:{
         type: Sequelize.BIGINT,
         allowNull: false
       },
       password:{
           type: Sequelize.STRING,
           allowNull: false
       },
       createdAt: Sequelize.DATE,
       updatedAt: Sequelize.DATE
  })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
};
