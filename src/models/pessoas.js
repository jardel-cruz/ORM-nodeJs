'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, { foreignKey: 'docente_id' })
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado' },
        as: 'aulasMatriculadas'
      })
    }
  }
  Pessoas.init({
    nome: {
        type: DataTypes.STRING,
        validate: {
            validarNome: (dado) => {
                if (dado.length < 3) throw new Error('O campo nome deve possuir mais de 3 caracteres') 
            }
        }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                args: true,
                msg: 'Email invalido'
            }
        }
    },
    role: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
                args: [['docente', 'estudante']],
                msg: 'O valor passado não é valido, valores validos: "estudante" e "docente"'
            }
        }
    }
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {
        where: {ativo: true}
    },
    scopes: {
        todos: {where: {}}
    }
  });
  return Pessoas;
};