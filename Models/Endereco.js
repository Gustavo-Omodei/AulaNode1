const { type } = require('express/lib/response');
const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

class Endereco extends Model{}

Endereco.init({
    Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Cep: {
        type: DataTypes.STRING,


    },

});
    
