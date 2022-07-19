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
}

module.exports = TurmaController