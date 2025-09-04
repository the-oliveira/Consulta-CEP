'use strict';
require('dotenv').config();
const db_tipo = process.env.DB_TIPO;
const db_caminho = process.env.DB_CAMINHO; 

/*
    DB USANDO APENAS A BIBLIOTECA PADRÃO DO SQLITE

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/dne.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('OK');
    }
});

module.exports = db;*/


//USANDO SEQUELIZE

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: db_tipo,
    storage: db_caminho
})

module.exports = sequelize;