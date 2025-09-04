'use strict';

//const db = require('../database/db');
const consulta_cep = require('../database/model');

class CepRepository {
    async BuscaCep(cep) {

        //const resultado = await consulta_cep.findByPk(cep_form);
        const resultado = await consulta_cep.findOne({
            where: {
                cep: cep
            }
        });
        if(resultado){
            console.log('Consulta realizada pelo banco local')
        }
        
        return resultado
    };
}


module.exports = new CepRepository();