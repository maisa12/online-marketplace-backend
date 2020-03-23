const Sequelize = require('sequelize');
const sequelize = new Sequelize('test1', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    operatorAliases: false
});
module.exports = sequelize;