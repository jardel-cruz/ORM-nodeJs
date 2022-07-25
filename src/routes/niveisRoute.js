const { Router } = require('express')
const NivelController = require('../controllers/NivelController.js')

const router = Router()

router
    .get('/nivel', NivelController.pegaNiveis)
    .get('/nivel/:id', NivelController.pegaUmNivel)
    .post('/nivel', NivelController.addNivel)
    .post('/nivel/:id/restaura', NivelController.restaurarNivel)
    .put('/nivel/:id', NivelController.atualizarNivel)
    .delete('/nivel/:id', NivelController.deletarNivel)

module.exports = router