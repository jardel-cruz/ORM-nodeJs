const { Router } = require('express')
const PessoasController = require('../controllers/PessoaController.js')

const router = Router()

router
    .get('/pessoas', PessoasController.pegaPessoasAtivas)
    .get('/pessoas/todos', PessoasController.pegaTodasPessoas)
    .get('/pessoas/matricula', PessoasController.pegaTodasMatriculas)
    .get('/pessoas/:id', PessoasController.pegaUmaPessoa)
    .get('/pessoas/:estuId/matricula/:matrId', PessoasController.pegaUmaMatricula)
    .get('/pessoas/:id/matricula', PessoasController.pegaMatriculaDoEstudante)
    .post('/pessoas', PessoasController.addPessoa)
    .post('/pessoas/:estuId/matricula', PessoasController.addMatricula)
    .post('/pessoas/:id/restaura', PessoasController.restauraPessoa)
    .post('/pessoas/:estuId/matricula/:matrId/restaura', PessoasController.restauraMatriculas)
    .put('/pessoas/:id', PessoasController.atualizarPessoa)
    .put('/pessoas/:estuId/matricula/:matrId', PessoasController.atualizarMatricula)
    .delete('/pessoas/:id', PessoasController.deletarPessoa)
    .delete('/pessoas/:estuId/matricula/:matrId', PessoasController.deletarMatricula)

    module.exports = router