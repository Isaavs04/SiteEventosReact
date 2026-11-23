
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

//Registra as rotas de autenticação.
app.use(authRoutes);

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API do Sistema de Eventos funcionando!'
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor executando em http://localhost:${PORT}`);
});
