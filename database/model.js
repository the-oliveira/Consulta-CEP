'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');
const database = require('./db');
const db_tabela = process.env.DB_TABELA;

const consulta_cep = database.define(db_tabela, {
    cep: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    logradouro: {
        type: Sequelize.STRING,
        allowNull: true
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: true
    }, 
    bairro: {
        type: Sequelize.STRING,
        allowNull: true
    }, 
    localidade: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    ibge: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    uf: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = consulta_cep;