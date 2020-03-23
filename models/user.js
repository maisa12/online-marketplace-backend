const Sequelize = require('sequelize');
const sequelize = require('./connection');
module.exports = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name_lastname: {
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