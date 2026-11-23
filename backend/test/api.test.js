// Testes de integração da API (login, 401 e CRUD de eventos).
// Sobe o app numa porta aleatória, então não conflita com o servidor na 3000.
process.env.JWT_SECRET = 'segredo_de_teste';

const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

let server;
let base;
let token;

const novoEvento = {
  cliente: 'Cliente Teste',
  telefone: '(13)90000-0000',
  endereco: 'Rua Teste, 1',
  data: '2027-05-10',
  hora: '18:00',
  qtdConvidados: 40,
  tipo: 'Formatura',
  buffet: 'Sim',
  valor: 'R$ 5.000,00'
};

const req = (caminho, { metodo = 'GET', corpo, tk } = {}) =>
  fetch(base + caminho, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
      ...(tk ? { Authorization: `Bearer ${tk}` } : {})
    },
    body: corpo === undefined ? undefined : JSON.stringify(corpo)
  });

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      base = `http://localhost:${server.address().port}`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

// ---------- Login ----------
test('POST /login com credenciais válidas devolve token', async () => {
  const r = await req('/login', {
    metodo: 'POST',
    corpo: { email: 'maria@eventos.com', senha: '1234' }
  });
  assert.equal(r.status, 200);
  const json = await r.json();
  assert.ok(json.token);
  token = json.token;
});

test('POST /login com senha errada devolve 401', async () => {
  const r = await req('/login', {
    metodo: 'POST',
    corpo: { email: 'maria@eventos.com', senha: 'errada' }
  });
  assert.equal(r.status, 401);
});

test('POST /login com e-mail inexistente devolve 401', async () => {
  const r = await req('/login', {
    metodo: 'POST',
    corpo: { email: 'naoexiste@x.com', senha: '1234' }
  });
  assert.equal(r.status, 401);
});

test('POST /login sem campos devolve 400', async () => {
  const r = await req('/login', { metodo: 'POST', corpo: {} });
  assert.equal(r.status, 400);
});

// ---------- 401 nas rotas do CRUD ----------
test('rotas do CRUD respondem 401 sem token', async () => {
  const chamadas = [
    ['/eventos'],
    ['/eventos/1'],
    ['/eventos', { metodo: 'POST', corpo: novoEvento }],
    ['/eventos/1', { metodo: 'PUT', corpo: novoEvento }],
    ['/eventos/1', { metodo: 'DELETE' }]
  ];
  for (const [caminho, opcoes] of chamadas) {
    const r = await req(caminho, opcoes);
    assert.equal(r.status, 401, `${opcoes?.metodo || 'GET'} ${caminho}`);
  }
});

test('GET /eventos responde 401 com token inválido', async () => {
  const r = await req('/eventos', { tk: 'token.invalido.aqui' });
  assert.equal(r.status, 401);
});

test('GET /eventos responde 401 com token expirado', async () => {
  const expirado = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: -10 });
  const r = await req('/eventos', { tk: expirado });
  assert.equal(r.status, 401);
});

test('GET /eventos responde 401 com token assinado por outra chave', async () => {
  const falso = jwt.sign({ id: 1 }, 'outra_chave', { expiresIn: '1h' });
  const r = await req('/eventos', { tk: falso });
  assert.equal(r.status, 401);
});

test('GET /eventos responde 401 com formato de cabeçalho inválido', async () => {
  const r = await fetch(`${base}/eventos`, { headers: { Authorization: token } });
  assert.equal(r.status, 401);
});

// ---------- CRUD com token ----------
test('GET /eventos lista os pré-cadastrados', async () => {
  const r = await req('/eventos', { tk: token });
  assert.equal(r.status, 200);
  const lista = await r.json();
  assert.ok(Array.isArray(lista));
  assert.ok(lista.length >= 3);
  assert.equal(lista[0].cliente, 'Maria da Silva');
});

test('GET /eventos aceita filtro por tipo', async () => {
  const r = await req('/eventos?tipo=Casamento', { tk: token });
  const lista = await r.json();
  assert.ok(lista.length >= 1);
  assert.ok(lista.every((e) => e.tipo === 'Casamento'));
});

test('CRUD completo: criar, buscar, editar e excluir', async () => {
  // criar
  let r = await req('/eventos', { metodo: 'POST', corpo: novoEvento, tk: token });
  assert.equal(r.status, 201);
  const criado = await r.json();
  assert.ok(criado.id);
  assert.equal(criado.cliente, 'Cliente Teste');
  assert.equal(Object.keys(criado).length, 10);

  // buscar
  r = await req(`/eventos/${criado.id}`, { tk: token });
  assert.equal(r.status, 200);
  assert.equal((await r.json()).tipo, 'Formatura');

  // editar
  r = await req(`/eventos/${criado.id}`, {
    metodo: 'PUT',
    corpo: { ...novoEvento, cliente: 'Cliente Editado', valor: 'R$ 6.000,00' },
    tk: token
  });
  assert.equal(r.status, 200);
  const editado = await r.json();
  assert.equal(editado.id, criado.id);
  assert.equal(editado.cliente, 'Cliente Editado');
  assert.equal(editado.valor, 'R$ 6.000,00');

  // excluir
  r = await req(`/eventos/${criado.id}`, { metodo: 'DELETE', tk: token });
  assert.equal(r.status, 204);

  // não existe mais
  r = await req(`/eventos/${criado.id}`, { tk: token });
  assert.equal(r.status, 404);
});

test('POST /eventos sem campos obrigatórios devolve 400 e não cadastra', async () => {
  const antes = await (await req('/eventos', { tk: token })).json();
  const r = await req('/eventos', {
    metodo: 'POST',
    corpo: { telefone: '123' },
    tk: token
  });
  assert.equal(r.status, 400);
  const depois = await (await req('/eventos', { tk: token })).json();
  assert.equal(depois.length, antes.length);
});

test('PUT /eventos/:id inválido devolve 400 e não altera o evento', async () => {
  const r = await req('/eventos/1', {
    metodo: 'PUT',
    corpo: { cliente: '', data: '', tipo: '' },
    tk: token
  });
  assert.equal(r.status, 400);
  const evento = await (await req('/eventos/1', { tk: token })).json();
  assert.equal(evento.cliente, 'Maria da Silva');
});

test('PUT e DELETE de id inexistente devolvem 404', async () => {
  let r = await req('/eventos/9999', { metodo: 'PUT', corpo: novoEvento, tk: token });
  assert.equal(r.status, 404);
  r = await req('/eventos/9999', { metodo: 'DELETE', tk: token });
  assert.equal(r.status, 404);
});

test('rota inexistente devolve 404', async () => {
  const r = await req('/nada');
  assert.equal(r.status, 404);
});

test('JSON malformado devolve 400', async () => {
  const r = await fetch(`${base}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{ quebrado'
  });
  assert.equal(r.status, 400);
});
