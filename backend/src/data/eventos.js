const Evento = require('../models/Evento');

// Eventos pré-cadastrados (em memória), como instâncias da classe Evento.
// Ao reiniciar o servidor, a lista volta a ser esta.
const eventos = [
  new Evento({
    id: 1, cliente: 'Maria da Silva', telefone: '(13)99999-1111',
    endereco: 'R. Maria Cristina, 50 - Casqueiro, Cubatão',
    data: '2026-12-20', hora: '19:00', qtdConvidados: 50,
    tipo: 'Casamento', buffet: 'Sim', valor: 'R$ 8.000,00'
  }),
  new Evento({
    id: 2, cliente: 'João Pereira', telefone: '(13)98888-2222',
    endereco: 'Av. Conselheiro Nébias, 100 - Santos',
    data: '2026-12-05', hora: '14:30', qtdConvidados: 30,
    tipo: 'Aniversario', buffet: 'Nao', valor: 'R$ 2.500,00'
  }),
  new Evento({
    id: 3, cliente: 'Empresa XYZ', telefone: '(13)97777-3333',
    endereco: 'R. XV de Novembro, 200 - Cubatão',
    data: '2027-01-15', hora: '09:00', qtdConvidados: 120,
    tipo: 'Palestra', buffet: 'Sim', valor: 'R$ 12.000,00'
  })
];

module.exports = eventos;
