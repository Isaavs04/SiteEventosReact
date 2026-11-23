const eventos = require('../data/eventos');
const Evento = require('../models/Evento');

// Próximo id a ser usado (continua a partir do maior id existente).
let proximoId = eventos.reduce((maior, e) => Math.max(maior, e.id), 0) + 1;

// ---------- CRUD de eventos ----------

// GET /eventos  (busca opcional)
// Ex.: /eventos?cliente=maria&tipo=Casamento&data=2026-12-20&hora=19:00&buffet=Sim&valor=8.000
const listar = (req, res) => {
  const { cliente, tipo, data, hora, buffet, valor } = req.query;
  let resultado = eventos;

  if (cliente) {
    resultado = resultado.filter((e) =>
      e.cliente.toLowerCase().includes(String(cliente).toLowerCase())
    );
  }
  if (tipo) resultado = resultado.filter((e) => e.tipo === tipo);
  if (data) resultado = resultado.filter((e) => e.data === data);
  if (hora) resultado = resultado.filter((e) => e.hora === hora);
  if (buffet) resultado = resultado.filter((e) => e.buffet === buffet);
  if (valor) {
    resultado = resultado.filter((e) => String(e.valor).includes(String(valor)));
  }

  return res.status(200).json(resultado);
};

// GET /eventos/:id
const buscarPorId = (req, res) => {
  const evento = eventos.find((e) => e.id === Number(req.params.id));

  if (!evento) {
    return res.status(404).json({ mensagem: 'Evento não encontrado.' });
  }

  return res.status(200).json(evento);
};

// POST /eventos
const criar = (req, res) => {
  const novo = new Evento({ ...req.body, id: proximoId });
  const erro = novo.validar();
  if (erro) return res.status(400).json({ mensagem: erro });

  proximoId++;
  eventos.push(novo);

  return res.status(201).json(novo);
};

// PUT /eventos/:id
const atualizar = (req, res) => {
  const evento = eventos.find((e) => e.id === Number(req.params.id));

  if (!evento) {
    return res.status(404).json({ mensagem: 'Evento não encontrado.' });
  }

  // Valida uma cópia antes de alterar o evento real.
  const erro = new Evento(req.body).validar();
  if (erro) return res.status(400).json({ mensagem: erro });

  evento.atualizar(req.body);

  return res.status(200).json(evento);
};

// DELETE /eventos/:id
const excluir = (req, res) => {
  const indice = eventos.findIndex((e) => e.id === Number(req.params.id));

  if (indice === -1) {
    return res.status(404).json({ mensagem: 'Evento não encontrado.' });
  }

  eventos.splice(indice, 1);

  return res.status(204).send();
};

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
