const database = require('../models')

class TurmaController {
    static async pegaTurmas (req, res) {
        try {
            const turmas = await database.Turmas.findAll()

            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaTurma (req, res) {
        try {
            const { id } = req.params
            const turma = await database.Turmas.findOne({ where: {id: Number(id)} })

            return res.status(200).json(turma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async addTurma (req, res) {
        try {
            const { body } = req
            const criarTurma = await database.Turmas.create(body)

            return res.status(200).json(criarTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma (req, res) {
        try {
            const { id } = req.params
            const { body } = req
            await database.Turmas.update(body, { where: {id: Number(id)} })
            const turmaAtualizada = await database.Turmas.findOne({ where: {id: Number(id)} })
            
            return res.status(201).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarTurma (req, res) {
        try {
            const { id } = req.params
            await database.Turmas.destroy({ where: {id: Number(id)} })

            return res.status(200).json({ message: `id: ${id} deletado com sucesso!!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restaurarTurma (req, res) {
        try {
            const { id } = req.params
            await database.Turmas.restore({ where: {id: Number(id)} })

            return res.status(201).json({ message: `id: ${id} restaurado com sucesso!!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController