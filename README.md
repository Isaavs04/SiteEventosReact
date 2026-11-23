# Sistema de Gestão de Eventos

Trabalho em grupo do IFSP campus Cubatão da matéria de desenvolvimento web do curso de ADS.

Aplicação web para gerenciamento de eventos, desenvolvida com React no frontend e Node.js com Express no backend. O sistema possui autenticação de administrador por meio de token JWT.

## Tecnologias utilizadas

### Frontend
- React
- JavaScript
- Vite
- React Router DOM
- CSS

### Backend
- Node.js
- Express
- JSON Web Token (JWT)
- bcryptjs
- CORS
- dotenv

## Estrutura do projeto

```text
SiteEventosReact/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── middlewares/
│   │   ├── models/          (classe Evento)
│   │   ├── routes/
│   │   ├── app.js           (monta o app Express)
│   │   └── server.js        (sobe o servidor)
│   ├── test/                (testes unitários e de integração)
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── login.json
└── README.md
```

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- npm (instalado junto com o Node.js)
- Git (opcional, para clonar o repositório)

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/Isaavs04/SiteEventosReact.git
```

Entre na pasta do projeto:

```bash
cd SiteEventosReact
```

### 2. Instalar as dependências do backend

```bash
cd backend
npm install
```

### 3. Configurar as variáveis de ambiente

Na pasta `backend`, crie um arquivo chamado `.env` e adicione:

```env
JWT_SECRET=sua_chave_secreta_aqui
```

A variável `JWT_SECRET` é utilizada para assinar e validar os tokens JWT. Utilize uma chave secreta própria e não compartilhe esse arquivo.

> Este projeto já acompanha um `backend/.env` pronto para desenvolvimento e um `backend/.env.example` como modelo. Se o `.env` não existir (por exemplo, depois de clonar o repositório), copie o `.env.example` para `.env` e troque o valor. Sem `JWT_SECRET` o servidor não inicia.

### 4. Instalar as dependências do frontend

Abra outro terminal na pasta raiz do projeto e execute:

```bash
cd frontend
npm install
```

## Executando a aplicação

O frontend e o backend precisam estar em execução simultaneamente.

### 1. Iniciar o backend

No primeiro terminal:

```bash
cd backend
npm run dev
```

O servidor será iniciado em:

```text
http://localhost:3000
```

### 2. Iniciar o frontend

No segundo terminal:

```bash
cd frontend
npm run dev
```

O Vite exibirá o endereço local da aplicação, geralmente:

```text
http://localhost:5173
```

Acesse esse endereço pelo navegador para utilizar o sistema.

## Autenticação

O sistema utiliza autenticação baseada em JWT (JSON Web Token).

- O administrador é pré-cadastrado no backend.
- O login é realizado por meio da rota `POST /login`.
- Após a autenticação, a API retorna um token JWT.
- O frontend armazena o token no `localStorage`.
- As rotas protegidas devem exigir um token válido.
- Tokens inválidos ou expirados devem resultar em resposta HTTP 401.

### Credenciais de acesso para desenvolvimento

| Campo | Valor |
|---|---|
| E-mail | maria@eventos.com |
| Senha | 1234 |

Também existe um segundo usuário pré-cadastrado, usado nos testes da disciplina (`login.json`):

| Campo | Valor |
|---|---|
| E-mail | prof@ifsp.edu.br |
| Senha | 123456 |

**Observação:** essas credenciais são destinadas ao ambiente de desenvolvimento e demonstração acadêmica.

### Rotas da API

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/login` | Pública | Autentica e retorna o token JWT |
| GET | `/verificar-token` | Protegida | Confere se o token é válido |
| GET | `/eventos` | Protegida | Lista os eventos (filtros opcionais: `cliente`, `tipo`, `data`, `hora`, `buffet`, `valor`) |
| GET | `/eventos/:id` | Protegida | Busca um evento |
| POST | `/eventos` | Protegida | Cadastra um evento (`cliente`, `data` e `tipo` são obrigatórios) |
| PUT | `/eventos/:id` | Protegida | Atualiza um evento |
| DELETE | `/eventos/:id` | Protegida | Exclui um evento |

As rotas protegidas exigem o cabeçalho `Authorization: Bearer <token>`. No frontend, se a API responder 401 (token inválido ou expirado), o usuário é levado de volta para a tela de login.

## Classe do objeto (Evento)

A classe `Evento` fica em `backend/src/models/Evento.js`. Ela tem:

- **Construtor** que recebe um objeto com os dados do evento;
- **10 propriedades privadas**: `id`, `cliente`, `telefone`, `endereco`, `data`, `hora`, `qtdConvidados`, `tipo`, `buffet` e `valor`;
- **Getters e setters** para cada propriedade;
- **Métodos**: `validar()` (cliente, data e tipo são obrigatórios), `atualizar(dados)` e `toJSON()`.

Os eventos pré-cadastrados e os criados pelo `POST /eventos` são instâncias dessa classe.

## Testes

Os testes usam o test runner nativo do Node (`node --test`), sem instalar nada além das dependências do backend.

```bash
cd backend
npm test
```

- **Unitários** (`test/evento.test.js`): construtor, getters/setters, `validar()`, `atualizar()` e `toJSON()` da classe `Evento`.
- **Integração** (`test/api.test.js`): sobem a API numa porta aleatória e testam login válido e inválido, resposta 401 nas rotas do CRUD (sem token, token inválido, expirado, de outra chave e com cabeçalho mal formado), CRUD completo e erros 400/404.

Também é possível testar a API manualmente com Thunder Client ou Postman. Qualquer requisição sem token válido nas rotas protegidas deve receber HTTP 401.

## Observações

- O projeto utiliza dados pré-cadastrados em memória no backend.
- Não é necessário configurar um banco de dados para executar a aplicação.
- O backend e o frontend devem permanecer em execução durante a utilização local do sistema.
- O arquivo `.env` não deve ser enviado ao repositório.

