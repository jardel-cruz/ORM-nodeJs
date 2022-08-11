const database = require('../models')

class Services {
    constructor (model) {
        this.model = model
    }

    async pegaRegistros (where) {
        const response = await database[this.model].findAll(where)
        return response
    }

    async pegaUmRegistro (where) {
        const response = await database[this.model].findOne({where: where})

        return response
    }

    async addRegistro (dados) {
        const registro = await database[this.model].create(dados)

        return registro
    }

    async atualizaRegistro (dados, id, transiction = {}) {
        return database[this.model]
            .update(dados, {where: {id: id}}, transiction)
    }

    async atualizaRegistros (dados, where, transiction = {}) {
        return database[this.model]
            .update(dados, {where: where }, transiction)
    }

    async deletarRegistro (where) {
        return await database[this.model].destroy({where: where}) 
    } 

    async restalrarRegistro (where) {
        return await database[this.model].restore({where: where}) 
    } 
}

module.exports = Services