// Classe do objeto do tema (Gestão de eventos).
// Propriedades privadas (#) + getters/setters, construtor, métodos de
// validação, atualização e conversão para JSON.
class Evento {
  #id;
  #cliente;
  #telefone;
  #endereco;
  #data;
  #hora;
  #qtdConvidados;
  #tipo;
  #buffet;
  #valor;

  constructor({
    id,
    cliente,
    telefone = '',
    endereco = '',
    data,
    hora = '',
    qtdConvidados = '',
    tipo,
    buffet = '',
    valor = ''
  } = {}) {
    this.#id = id;
    this.#cliente = cliente;
    this.#telefone = telefone || '';
    this.#endereco = endereco || '';
    this.#data = data;
    this.#hora = hora || '';
    this.#qtdConvidados = qtdConvidados || '';
    this.#tipo = tipo;
    this.#buffet = buffet || '';
    this.#valor = valor || '';
  }

  // ---------- Getters e setters ----------
  get id() { return this.#id; }
  set id(valor) { this.#id = valor; }

  get cliente() { return this.#cliente; }
  set cliente(valor) { this.#cliente = valor; }

  get telefone() { return this.#telefone; }
  set telefone(valor) { this.#telefone = valor || ''; }

  get endereco() { return this.#endereco; }
  set endereco(valor) { this.#endereco = valor || ''; }

  get data() { return this.#data; }
  set data(valor) { this.#data = valor; }

  get hora() { return this.#hora; }
  set hora(valor) { this.#hora = valor || ''; }

  get qtdConvidados() { return this.#qtdConvidados; }
  set qtdConvidados(valor) { this.#qtdConvidados = valor || ''; }

  get tipo() { return this.#tipo; }
  set tipo(valor) { this.#tipo = valor; }

  get buffet() { return this.#buffet; }
  set buffet(valor) { this.#buffet = valor || ''; }

  get valor() { return this.#valor; }
  set valor(valor) { this.#valor = valor || ''; }

  // ---------- Métodos ----------

  // Retorna a mensagem de erro, ou null se o evento é válido.
  validar() {
    if (!this.#cliente || !this.#data || !this.#tipo) {
      return 'Cliente, data e tipo são obrigatórios.';
    }
    return null;
  }

  // Atualiza todos os dados editáveis (o id não muda).
  atualizar(dados = {}) {
    this.cliente = dados.cliente;
    this.telefone = dados.telefone;
    this.endereco = dados.endereco;
    this.data = dados.data;
    this.hora = dados.hora;
    this.qtdConvidados = dados.qtdConvidados;
    this.tipo = dados.tipo;
    this.buffet = dados.buffet;
    this.valor = dados.valor;
  }

  // Usado automaticamente pelo res.json() do Express.
  toJSON() {
    return {
      id: this.#id,
      cliente: this.#cliente,
      telefone: this.#telefone,
      endereco: this.#endereco,
      data: this.#data,
      hora: this.#hora,
      qtdConvidados: this.#qtdConvidados,
      tipo: this.#tipo,
      buffet: this.#buffet,
      valor: this.#valor
    };
  }
}

module.exports = Evento;
