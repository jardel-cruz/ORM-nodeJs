const database = require('../models')

class NivelController {
    static async pegaNiveis (req, res) {
        try {
            const niveis = await database.Niveis.findAll()
            
            return res.status(200).json(niveis)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmNivel (req, res) {
        try {
            const { id } = req.params
            const nivel = await database.Niveis.findOne({ where: {id: Number(id)} })

            return res.status(200).json(nivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async addNivel (req, res) {
        try {
            const { body } = req
            const criarNivel = await database.Niveis.create(body)

            return res.status(201).json(criarNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarNivel (req, res) {
        try {
            const { id } = req.params
            const { body } = req
            await database.Niveis.update(body, { where: {id: Number(id)} })
            const nivelAtualizado = await database.Niveis.findOne({ where: {id: Number(id)} })

            return res.status(201).json(nivelAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarNivel (req, res) {
        try {
            const { id } = req.params
            await database.Niveis.destroy({ where: {id: Number(id)} })

            return res.status(200).json({ message: `id: ${id} deletado com sucesso!!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restaurarNivel (req, res) {
        try {
            const { id } = req.params
            await database.Niveis.restore({ where: {id: Number(id)} })
    
            return res.status(201).json({ message: `id: ${id} restaurado com sucesso!!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController