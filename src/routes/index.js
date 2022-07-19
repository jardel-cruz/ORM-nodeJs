const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoute.js')
const niveis = require('./niveisRoute.js')
const turmas = require('./turmaRoute.js')

module.exports = app => {
    app.use(bodyParser.json())
    app.get('/', (req, res) => res.send('ola'))

    app.use(
        pessoas,
        niveis,
        turmas
        )
}