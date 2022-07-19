const { Router } = require('express')
const NivelController = require('../controllers/NivelController.js')

const router = Router()

router
    .get('/niveis', NivelController.pegaNiveis)

module.exports = router