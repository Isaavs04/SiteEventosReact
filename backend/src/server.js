require('dotenv').config();

// Sem JWT_SECRET não dá para assinar/validar tokens: avisa e encerra.
if (!process.env.JWT_SECRET) {
  console.error('ERRO: defina JWT_SECRET no arquivo backend/.env (veja o README).');
  process.exit(1);
}

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor executando em http://localhost:${PORT}`);
});
