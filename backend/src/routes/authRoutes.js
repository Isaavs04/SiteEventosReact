
const express = require('express');
const { login } = require('../controllers/authController');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota pública: realiza o login.
router.post('/login', login);

// Rota protegida: verifica se o token é válido.
router.get('/verificar-token', verificarToken, (req, res) => {
  res.status(200).json({
    mensagem: 'Token válido.',
    usuario: req.usuario
  });
});

module.exports = router;