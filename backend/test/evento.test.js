// Testes unitários da classe Evento.
const test = require('node:test');
const assert = require('node:assert/strict');
const Evento = require('../src/models/Evento');

const dadosValidos = {
  id: 1,
  cliente: 'Maria da Silva',
  telefone: '(13)99999-1111',
  endereco: 'R. Maria Cristina, 50',
  data: '2026-12-20',
  hora: '19:00',
  qtdConvidados: 50,
  tipo: 'Casamento',
  buffet: 'Sim',
  valor: 'R$ 8.000,00'
};

test('construtor guarda as 10 propriedades', () => {
  const e = new Evento(dadosValidos);
  assert.equal(e.id, 1);
  assert.equal(e.cliente, 'Maria da Silva');
  assert.equal(e.telefone, '(13)99999-1111');
  assert.equal(e.endereco, 'R. Maria Cristina, 50');
  assert.equal(e.data, '2026-12-20');
  assert.equal(e.hora, '19:00');
  assert.equal(e.qtdConvidados, 50);
  assert.equal(e.tipo, 'Casamento');
  assert.equal(e.buffet, 'Sim');
  assert.equal(e.valor, 'R$ 8.000,00');
});

test('campos opcionais não informados viram string vazia', () => {
  const e = new Evento({ cliente: 'Ana', data: '2026-01-01', tipo: 'Palestra' });
  assert.equal(e.telefone, '');
  assert.equal(e.endereco, '');
  assert.equal(e.hora, '');
  assert.equal(e.qtdConvidados, '');
  assert.equal(e.buffet, '');
  assert.equal(e.valor, '');
});

test('setters alteram e getters devolvem o novo valor', () => {
  const e = new Evento(dadosValidos);
  e.cliente = 'João';
  e.tipo = 'Aniversario';
  e.hora = '10:30';
  assert.equal(e.cliente, 'João');
  assert.equal(e.tipo, 'Aniversario');
  assert.equal(e.hora, '10:30');
});

test('propriedades são privadas (não aparecem como campos do objeto)', () => {
  const e = new Evento(dadosValidos);
  assert.deepEqual(Object.keys(e), []);
});

test('validar() aceita evento completo', () => {
  assert.equal(new Evento(dadosValidos).validar(), null);
});

for (const campo of ['cliente', 'data', 'tipo']) {
  test(`validar() rejeita evento sem ${campo}`, () => {
    const e = new Evento({ ...dadosValidos, [campo]: undefined });
    assert.equal(e.validar(), 'Cliente, data e tipo são obrigatórios.');
  });
}

test('validar() rejeita corpo vazio', () => {
  assert.ok(new Evento().validar());
});

test('atualizar() altera os dados e mantém o id', () => {
  const e = new Evento(dadosValidos);
  e.atualizar({ ...dadosValidos, id: 99, cliente: 'Novo Cliente', valor: 'R$ 1,00' });
  assert.equal(e.id, 1);
  assert.equal(e.cliente, 'Novo Cliente');
  assert.equal(e.valor, 'R$ 1,00');
});

test('toJSON() devolve objeto simples com todas as propriedades', () => {
  const e = new Evento(dadosValidos);
  assert.deepEqual(e.toJSON(), dadosValidos);
  assert.deepEqual(JSON.parse(JSON.stringify(e)), dadosValidos);
});
