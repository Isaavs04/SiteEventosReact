const express = require('express');
const verificarToken = require('../middlewares/authMiddleware');
const {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
} = require('../controllers/eventosController');

const router = express.Router();

// Todas as rotas de eventos são protegidas:
// sem token (ou com token inválido/expirado) a resposta é HTTP 401.
router.use(verificarToken);

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', excluir);

module.exports = router;
