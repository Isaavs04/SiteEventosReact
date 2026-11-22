
const bcrypt = require('bcryptjs');

// Usuários previamente cadastrados no sistema
const usuarios = [
{id: 1, nome: 'Administrador', email: 'maria@eventos.com',
    // Armazena o hash, não a senha em texto puro.
    senhaHash: bcrypt.hashSync('1234', 10)
  },
  
];

module.exports = usuarios;
