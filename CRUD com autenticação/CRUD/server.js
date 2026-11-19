const express = require('express');
const app = express();
const PORT = 3000;

// permite ler JSON no corpo da requisição
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// "banco de dados" em memória
let estudantes = [{ id: 1, nome: 'Ana Souza', email: 'ana@aluno.ifsp.edu.br', curso: 'ADS' }];
let proximoId = 2;

// listar todos os estudantes
app.get('/estudantes', autenticar, (req, res) => {
    res.json(estudantes);
});

app.post('/estudantes', autenticar, (req, res) => {
    const { nome, email, curso } = req.body;

    if (!nome || !email) {
        return res.status(400).json({
            erro: 'Nome e email são obrigatórios'
        });
    }
    const novo = {
        id: proximoId++,
        nome,
        email,
        curso: curso || null
    };

    estudantes.push(novo);
    res.status(201).json(novo);
});

// buscar um estudante pelo id
app.get('/estudantes/:id', autenticar, (req, res) => {
    const id = Number(req.params.id);
    const estudante = estudantes.find((e) => e.id === id);

    if (!estudante) {
        return res.status(404).json({
            erro: 'Estudante não encontrado'
        });
    }

    res.json(estudante);
});

// atualizar um estudante
app.put('/estudantes/:id', autenticar, (req, res) => {
    const id = Number(req.params.id);
    const estudante = estudantes.find((e) => e.id === id);

    if (!estudante) {
        return res.status(404).json({
            erro: 'Estudante não encontrado'
        });
    }

    const { nome, email, curso } = req.body;

    if (!nome || !email) {
        return res.status(400).json({
            erro: 'Nome e email são obrigatórios'
        });
    }

    estudante.nome = nome;
    estudante.email = email;
    estudante.curso = curso || null;
    res.json(estudante);
});

app.delete('/estudantes/:id', autenticar, (req, res) => {
    const id = Number(req.params.id);
    const indice = estudantes.findIndex((e) => e.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Estudante não encontrado'
        });
    }

    estudantes.splice(indice, 1);
    res.status(204).send();
});

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const usuarios = [{
    id: 1, nome: 'Prof', email: 'prof@ifsp.edu.br',
    senhaHash: bcrypt.hashSync('123456', 10)
}];

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find((u) => u.email === email);
    const ok = usuario &&
        (await bcrypt.compare(senha || '', usuario.senhaHash));
    if (!ok) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    const token = jwt.sign(
        { sub: usuario.id, email }, JWT_SECRET, { expiresIn: '1h' }
    );
    res.json({ token });
});

function autenticar(req, res, next) {
    const cab = req.headers.authorization || '';
    const [tipo, token] = cab.split(' ');
    if (tipo !== 'Bearer' || !token) {
        return res.status(401).json({ erro: 'Token ausente' });
    }
    try {
        req.usuario = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
}

