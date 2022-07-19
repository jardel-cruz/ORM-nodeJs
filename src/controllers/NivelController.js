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
}

module.exports = NivelController