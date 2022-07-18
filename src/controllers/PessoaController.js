const database = require('../models')

class PessoasController {
    static async pegaTodasPessoas (req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll()

            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa (req, res) {
        try {
            const { id } = req.params
            const pessoa = await database.Pessoas.findOne({ where: {id: Number(id)} })

            return res.status(200).json(pessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async addPessoa (req, res) {
        try {
            const { nome, ativo, email, role} = req.body
            const novaPessoa = {
                nome: String(nome),
                ativo: Boolean(ativo),
                email: String(email),
                role: String(role)
            }
            const criarPessoa = await database.Pessoas.create(novaPessoa)

            return res.status(201).json(criarPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarPessoa (req, res) {
        try {
            const { id } = req.params
            const { body } = req
            await database.Pessoas.update(body, { where: {id: Number(id)} })
            const pessoaAtualizada = await database.Pessoas.findOne({ where: {id: Number(id)} })

            return res.status(201).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarPessoa (req, res) {
        try {
            const { id } = req.params
            await database.Pessoas.destroy({ where: {id: Number(id)} })

            return res.status(201).json({ message: `id: ${id} deletado com sucesso!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoasController