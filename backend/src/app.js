// Monta o app Express (sem subir o servidor), para os testes poderem usá-lo.
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventosRoutes = require('./routes/eventosRoutes');

const app = express();

app.use(cors());
app.use(express.json());

//Registra as rotas de autenticação.
app.use(authRoutes);

// Rotas de eventos (CRUD) - exigem token válido.
app.use('/eventos', eventosRoutes);

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API do Sistema de Eventos funcionando!'
  });
});

// ---------- Tratamento de exceções ----------
// rota inexistente
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

// erros inesperados (ex.: JSON malformado no corpo)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ mensagem: 'JSON inválido no corpo da requisição.' });
  }
  console.error(err);
  return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
});

module.exports = app;
