const Sequelize = require('sequelize');
const sequelize = require('./connection');
module.exports = sequelize.define('category', {
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
       allowNull: false,
       unique: true
     },
     slug:{
       type: Sequelize.STRING,
       allowNull: false
     },
     createdAt: Sequelize.DATE,
     updatedAt: Sequelize.DATE
})