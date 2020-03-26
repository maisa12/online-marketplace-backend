const Sequelize = require('sequelize');
const sequelize = require('./connection');
module.exports = sequelize.define('category', {
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
       allowNull: false,
       unique: true
     },
     slug:{
       type: Sequelize.STRING,
       allowNull: false,
       primaryKey: true
     },
     createdAt: Sequelize.DATE,
     updatedAt: Sequelize.DATE
})