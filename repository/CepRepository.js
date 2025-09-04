'use strict';

const db = require('../database/db');

class CepRepository {
    async findByCep(cep) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM cep_unificado WHERE cep = ?', [cep], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }
}

module.exports = new CepRepository();