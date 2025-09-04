'use strict';

/* USANDO BIBLIOTECA PADRÃO DO SQLITE

const express = require('express');
require('./database/db');
const CepController = require('./controller/CepController');
const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/busca_cep/:cep', CepController.getAddressByCep);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

*/
require('dotenv').config();
const database = require('./database/db');
const CepController = require('./controller/CepController');
const express = require('express');

const app = express();
app.use(express.json());  


(async () => {
  try {
    const resultado = await database.sync();
    console.log(resultado);

    app.get('/busca_cep/:cep', CepController.getAddressByCep);

    const PORT =  process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.log(error);
  }
})();