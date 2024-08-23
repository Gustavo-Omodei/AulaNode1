const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'username',
    password: 'senha',
    database: 'api-node',
});

module.exports = sequelize;
