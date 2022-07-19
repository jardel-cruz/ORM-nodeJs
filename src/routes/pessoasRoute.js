const { Router } = require('express')
const PessoasController = require('../controllers/PessoaController.js')

const router = Router()

router
    .get('/pessoas', PessoasController.pegaTodasPessoas)
    .get('/pessoas/:id', PessoasController.pegaUmaPessoa)
    .get('/pessoas/:estuId/matricula/:matrId', PessoasController.pegaUmaMatricula)
    .post('/pessoas', PessoasController.addPessoa)
    .post('/pessoas/:estuId/matricula', PessoasController.addMatricula)
    .put('/pessoas/:id', PessoasController.atualizarPessoa)
    .put('/pessoas/:estuId/matricula/:matrId', PessoasController.atualizarMatricula)
    .delete('/pessoas/:id', PessoasController.deletarPessoa)
    .delete('/pessoas/:estuId/matricula/:matrId', PessoasController.deletarMatricula)

    module.exports = router