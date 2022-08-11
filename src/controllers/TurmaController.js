// const database = require('../models')
const { Op } = require ('sequelize')
const {TurmaServices} = require('../services')
const turmaServices = new TurmaServices()

class TurmaController {
    static async pegaTurmas (req, res) {
        try {
            const {data_inicio, data_final} = req.query
            const where = {}

            data_inicio || data_final ? where.data_inicio = {} : null
            data_inicio ? where.data_inicio[Op.gte] = data_inicio : null
            data_final ?  where.data_inicio[Op.lte] = data_final : null

            const turmas = await turmaServices.pegaRegistros({ where: where })

            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaTurma (req, res) {
        try {
            const { id } = req.params
            const turma = await turmaServices.pegaUmRegistro({id: Number(id)})

            return res.status(200).json(turma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async addTurma (req, res) {
        try {
            const { body } = req
            const criarTurma = await turmaServices.addRegistro(body)

            return res.status(200).json(criarTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma (req, res) {
        try {
            const { id } = req.params
            const { body } = req
            await turmaServices.atualizaRegistro(body, { where: {id: Number(id)} })
            const turmaAtualizada = await turmaServices.atualizaRegistro({ where: {id: Number(id)} })
            
            return res.status(201).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarTurma (req, res) {
        try {
            const { id } = req.params
            await turmaServices.deletarRegistro({id: Number(id)})

            return res.status(200).json({ message: `id: ${id} deletado com sucesso!!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restaurarTurma (req, res) {
        try {
            const { id } = req.params
            await turmaServices.restalrarRegistro({id: Number(id)})

            return res.status(201).json({ message: `id: ${id} restaurado com sucesso!!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController