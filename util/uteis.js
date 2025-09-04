'use strict';

String.prototype.ReplaceSpecialChars = function () {
    return this
        .replace(/[ÀÁÂÃÄÅ]/g, "A")
        .replace(/[aáàãâä]/g, "a")
        .replace(/[EÉÈÊË]/g, "E")
        .replace(/[eéèêë]/g, "e")
        .replace(/[IÍÌÎÏ]/g, "I")
        .replace(/[iíìîï]/g, "i")
        .replace(/[OÓÒÕÔÖ]/g, "O")
        .replace(/[oóòõôö]/g, "o")
        .replace(/[UÚÙÛÜ]/g, "U")
        .replace(/[uúùûü]/g, "u")
        .replace(/[ç]/g, "c")
        .replace(/[Ç]/g, "C");
}

let uteis = {
    caixaAlta: function (info) {
        for (let key in info) {
            if (info[key] != null && typeof info[key] == 'object') {
                this.caixaAlta(info[key])
            } else if (info[key] != null && typeof info[key] == 'string') {
                //info[key] = this.ReplaceSpecialChars(info[key]).toUpperCase()
                info[key] = info[key].toUpperCase().ReplaceSpecialChars()

            }
        }
        return info
    },
    /*
    ReplaceSpecialChars: function (info) {
        return info
            .replace(/[ÀÁÂÃÄÅ]/g, "A")
            .replace(/[aáàãâä]/g, "a")
            .replace(/[EÉÈÊË]/g, "E")
            .replace(/[eéèêë]/g, "e")
            .replace(/[IÍÌÎÏ]/g, "I")
            .replace(/[iíìîï]/g, "i")
            .replace(/[OÓÒÕÔÖ]/g, "O")
            .replace(/[oóòõôö]/g, "o")
            .replace(/[UÚÙÛÜ]/g, "U")
            .replace(/[uúùûü]/g, "u")
            .replace(/[ç]/g, "c")
            .replace(/[Ç]/g, "C");
    }

    consultaViaCep: async function (cep) {
        const apiURL = `https://viacep.com.br/ws/${cep}/json`

        try {
            const resposta = await fetch(apiURL);

            if (resposta) {
                console.log('Consulta realizada pela via cep')
                const dados = await resposta.json();
                return dados
            } else {
                return null
            }

        } catch (error) {
            console.error('Falha ao buscar dados da API:', error.message);
        }

    },

    consultaOpenCep: async function (cep) {
        const apiURL = `https://opencep.com/v1/${cep}`

        try {
            const resposta = await fetch(apiURL)

            if (resposta) {
                const dados = await resposta.json();
                console.log('Consulta realizada pelo open cep')
                return dados
            } else {
                return null
            }

        } catch (error) {
            console.error('Falha ao buscar dados da API:', error.message);
        }

    },
    */
    consultaApi: async function (url, cep) {
        const api_url = url.replace('@cep@', cep);

        try {
            const res = await fetch(api_url);
            if (res.ok) {
                console.log('Consulta realizada pela API externa');
                const dados = await res.json();
                return dados;
            }
        } catch (error) {
            console.error('Falha na requisição:', error.message);
        }
    }

}

module.exports = uteis