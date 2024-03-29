const { Router } = require('express')
const PessoasController = require('../controllers/PessoaController.js')

const router = Router()

router
    .get('/pessoas', PessoasController.pegaTodasPessoas)
    .get('/pessoas/ativas', PessoasController.pegaPessoasAtivas)
    .get('/pessoas/matricula', PessoasController.pegaTodasMatriculas)
    .get('/pessoas/:id', PessoasController.pegaUmaPessoa)
    .get('/pessoas/:estuId/matricula/:matrId', PessoasController.pegaUmaMatricula)
    .get('/pessoas/:id/matricula', PessoasController.pegaMatriculaDoEstudante)
    .get('/pessoas/matricula/:id/confirmadas', PessoasController.pegaMatriculaPorTurma)
    .get('/pessoas/matricula/lotadas', PessoasController.pegaMatriculaLotadas)
    .post('/pessoas', PessoasController.addPessoa)
    .post('/pessoas/:estuId/matricula', PessoasController.addMatricula)
    .post('/pessoas/:id/restaura', PessoasController.restauraPessoa)
    .post('/pessoas/:estuId/matricula/:matrId/restaura', PessoasController.restauraMatriculas)
    .put('/pessoas/:id', PessoasController.atualizarPessoa)
    .put('/pessoas/:estuId/matricula/:matrId', PessoasController.atualizarMatricula)
    .put('/pessoas/:id/cancela', PessoasController.cancelaPessoa)
    .delete('/pessoas/:id', PessoasController.deletarPessoa)
    .delete('/pessoas/:estuId/matricula/:matrId', PessoasController.deletarMatricula)

    module.exports = router