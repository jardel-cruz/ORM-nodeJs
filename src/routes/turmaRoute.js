const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController.js')

const router = Router()

router
    .get('/turma', TurmaController.pegaTurmas)
    .get('/turma/:id', TurmaController.pegaUmaTurma)
    .post('/turma', TurmaController.addTurma)
    .post('/turma/:id/restaura', TurmaController.restaurarTurma)
    .put('/turma/:id', TurmaController.atualizaTurma)
    .delete('/turma/:id', TurmaController.deletarTurma)

module.exports = router