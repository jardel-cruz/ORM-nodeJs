const { Router } = require('express')
const PessoasController = require('../controllers/PessoaController.js')

const router = Router()

router
    .get('/pessoas', PessoasController.pegaTodasPessoas)
    .get('/pessoas/:id', PessoasController.pegaUmaPessoa)
    .post('/pessoas', PessoasController.addPessoa)
    .put('/pessoas/:id', PessoasController.atualizarPessoa)
    .delete('/pessoas/:id', PessoasController.deletarPessoa)

    module.exports = router