# Sistema de Gestão de Eventos

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
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
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

**Observação:** essas credenciais são destinadas ao ambiente de desenvolvimento e demonstração acadêmica.

## Testes da API

As requisições da API podem ser testadas utilizando ferramentas como o Thunder Client ou Postman.

Os principais cenários de teste incluem:

- Login com credenciais válidas.
- Login com credenciais inválidas.
- Acesso a rotas protegidas com token válido.
- Tentativa de acesso sem token.
- Tentativa de acesso com token inválido ou expirado.

As requisições sem autenticação válida devem receber HTTP 401.

## Observações

- O projeto utiliza dados pré-cadastrados em memória no backend.
- Não é necessário configurar um banco de dados para executar a aplicação.
- O backend e o frontend devem permanecer em execução durante a utilização local do sistema.
- O arquivo `.env` não deve ser enviado ao repositório.

