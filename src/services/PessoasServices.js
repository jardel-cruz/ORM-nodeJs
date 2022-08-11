const Services = require('./Services')
const database = require('../models')

module.exports =  class PessoasServices extends Services {
    constructor () {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async pegaAtivos (where = {}) {
        const pessoas = await database[this.model].findAll(where)
        return pessoas
    }

    async pegaTodos (where = {}) {
        const pessoas = await database[this.model].scope('todos').findAll(where)
        
        return pessoas
    }

    async cancelaPessoa (estudanteId) {
        return database.sequelize.transaction(async tra => {
            await super.atualizaRegistro({ ativo: false }, estudanteId, { transaction: tra })
            await this.matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: estudanteId }, { transaction: tra })
        })
    }

}

