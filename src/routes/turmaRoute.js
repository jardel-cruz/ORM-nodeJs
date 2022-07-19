const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController.js')

const router = Router()

router
    .get('/turmas', TurmaController.pegaTurmas)

module.exports = router