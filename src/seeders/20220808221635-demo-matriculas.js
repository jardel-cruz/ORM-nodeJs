'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Matriculas', [
        {
            status: "confirmado",
            estudante_id: 1,
            turma_id: 5,
            createdAt: new Date(),
            updatedAt: new Date()
    },
    {
        status: "confirmado",
        estudante_id: 2,
        turma_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
},
    {
        status: "confirmado",
        estudante_id: 3,
        turma_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
},
    {
        status: "confirmado",
        estudante_id: 4,
        turma_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
},
    {
        status: "cancelado",
        estudante_id: 1,
        turma_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
},
    {
        status: "cancelado",
        estudante_id: 2,
        turma_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Matriculas', null, {})
  }
};
