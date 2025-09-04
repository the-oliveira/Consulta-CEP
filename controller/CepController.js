'use strict';

/*
  USANDO A BIBLIOTECA PADRÃO

const CepRepository = require('../repository/CepRepository');

class CepController {
  async getAddressByCep(req, res) {
    try {
      const { cep } = req.params;

      if (!cep || cep.length < 8) {
        return res.status(400).json({ erro: 'CEP invalido' });
      }

      const cep_form = cep.replace(/\D/g, '')
      const consulta_cep = await CepRepository.findByCep(cep_form);

      if (!consulta_cep) {
        return res.status(404).json({ erro: 'Endereço não encontrado' });
      }

      res.status(200).json(consulta_cep);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CepController();

*/
require('dotenv').config();
const CepRepository = require('../repository/CepRepositorySequelize');
const uteis = require('../util/uteis');

class CepController {
  static async getAddressByCep(req, res) {
    try {
      const { cep } = req.params;
      const cep_form = cep.replace(/\D/g, '')

      if (!cep_form || cep_form.length !== 8) {
        return res.status(400).json({ message: 'Formato de CEP inválido.' });
      }

      //console.log(`teste: ${cep_form}`)

      const res_consulta = await CepRepository.BuscaCep(cep_form);

      //console.log(`teste: ${res_consulta}`)

      /*
      if (res_consulta) {
        return res.status(200).json(uteis.caixaAlta(res_consulta));
      } else {
        const res_consulta_viacep = await uteis.consultaViaCep(cep_form);
        //const res_consulta_viacep = false;
        if (res_consulta_viacep) {
          return res.status(200).json(uteis.caixaAlta(res_consulta_viacep));
        } else {
          const res_consulta_opencep = await uteis.consultaOpenCep(cep_form)
          if (res_consulta_opencep) {

            return res.status(200).json(uteis.caixaAlta(res_consulta_opencep));
          } else {
            return res.status(404).json({ message: 'CEP não encontrado.' });
          }
        }
      }*/

      if (res_consulta) {
        return res.status(200).json(uteis.caixaAlta(res_consulta));
      } else {
        const api_externa = process.env.API_URL.trim().split(',')
        
        for (const url of api_externa) {
          const res_api_externa = await uteis.consultaApi(url, cep_form);
          if (res_api_externa) {
            return res.status(200).json(uteis.caixaAlta(res_api_externa));
          }
        }
        return res.status(404).json({ message: 'CEP não encontrado.' });
      }

    } catch (error) {
      console.error("Erro na busca do CEP:", error);
      return res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
  }
}

module.exports = CepController;