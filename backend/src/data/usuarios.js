
const bcrypt = require('bcryptjs');

// Usuários previamente cadastrados no sistema
// (armazena o hash, nunca a senha em texto puro).
const usuarios = [
  {
    id: 1,
    nome: 'Administrador',
    email: 'maria@eventos.com',
    senhaHash: bcrypt.hashSync('1234', 10)
  },
  {
    id: 2,
    nome: 'Prof',
    email: 'prof@ifsp.edu.br',
    senhaHash: bcrypt.hashSync('123456', 10)
  }
];

module.exports = usuarios;
