const database = require('../models')
const { literal } = require('sequelize')
const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()

class PessoasController {
    static async pegaPessoasAtivas (req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaAtivos()

            return res.status(200).json(pessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodasPessoas (req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodos()

            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa (req, res) {
        try {
            const { id } = req.params
            const pessoa = await pessoasServices.pegaUmRegistro({ id: Number(id) })

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
            const criarPessoa = await pessoasServices(novaPessoa)

            return res.status(201).json(criarPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarPessoa (req, res) {
        try {
            const { id } = req.params
            const { body } = req
            await pessoasServices.atualizaRegistro(body ,{ id: Number(id) })
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro({ id: Number(id) })

            return res.status(201).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarPessoa (req, res) {
        try {
            const { id } = req.params
            await pessoasServices.deletarRegistro({ id: Number(id) })

            return res.status(201).json({ message: `id: ${id} deletado com sucesso!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa (req, res) {
        try {
            const { id } = req.params
            await pessoasServices.restalrarRegistro({ id: Number(id) })

            return res.status(200).json({ message: `id: ${id} restaurado com sucesso` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodasMatriculas (req, res) {
        try {
            const matriculas = await pessoasServices.pegaRegistros()

            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula (req, res) {
        try {
            const { estuId, matrId } = req.params
            const where = {where: {
                id: Number(matrId),
                estudante_id: Number(estuId)
            }}
            const matricula = await database.Matriculas.findOne(where)

            return res.status(200).json(matricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async addMatricula (req, res) {
        try {
            const { estuId } = req.params
            const {status, turma_id} = req.body
            const novaMatricula = {
                status: String(status),
                turma_id: Number(turma_id),
                estudante_id: Number(estuId)
            }
            const criarMatricula = await database.Matriculas.create(novaMatricula)

            return res.status(201).json(criarMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarMatricula (req, res) {
        try {
            const { estuId, matrId } = req.params
            const { body } = req
            const where = {where: {id: Number(matrId), estudante_id: Number(estuId)}}
            await database.Matriculas.update(body, where)
            const matriculaAtualizada = await database.Matriculas.findOne({ where: {id: Number(matrId)} })

            return res.status(201).json(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarMatricula (req, res) {
        try {
            const { estuId, matrId } = req.params
            const where = {where: {id: Number(matrId), estudante_id: Number(estuId)}}
            await database.Matriculas.destroy(where)

            return res.status(201).json({ message: `Matricula: ${matrId} deletado com sucesso!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraMatriculas (req, res) {
        try {
            const { estuId, matrId } = req.params
            const where = {where: {id: Number(matrId), estudante_id: Number(estuId)}}
            await database.Matriculas.restore(where)

            return res.status(201).json({ message: `Matricula: ${matrId} restaurada com sucesso!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculaDoEstudante (req, res) {
        try {
            const { id } = req.params
            const pessoa = await database.Pessoas.findOne({where: {id: Number(id)}})
            const matriculas = await pessoa.getAulasMatriculadas()

            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculaPorTurma (req, res) {
        try {
            const { id } = req.params
            const matriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(id),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            })

            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculaLotadas(req, res) {
        const maximo = 2
        try {
            const matriculas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: literal(`count(turma_id) >= ${maximo}`)
            })

            return res.status(200).json(matriculas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoa (req, res) {
        database.sequelize.transaction( async tra => {
            try {
                const { id } = req.params
                await pessoasServices.cancelaPessoa(id)
    
                return res.status(200).json({ message: `As informações do estudante ${id} alteradas` })
            } catch (error) {
                return res.status(500).json(error.message)
            }
        })

        
    }

}

module.exports = PessoasController