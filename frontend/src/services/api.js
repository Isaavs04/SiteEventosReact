// Camada de comunicação com o backend (Express, porta 3000).
// O token é gravado no localStorage (chave "token") pela tela de login
// e enviado em todas as requisições.
const API_URL = 'http://localhost:3000';

function montarQuery(filtros = {}) {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([campo, valor]) => {
        if (valor !== '' && valor != null) params.append(campo, valor);
    });
    const texto = params.toString();
    return texto ? `?${texto}` : '';
}

async function requisicao(caminho, opcoes = {}) {
    const token = localStorage.getItem('token');

    let resposta;
    try {
        resposta = await fetch(`${API_URL}${caminho}`, {
            ...opcoes,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
    } catch {
        // servidor desligado, porta errada, sem rede...
        throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
    }

    // DELETE devolve 204 (sem corpo)
    if (resposta.status === 204) return null;

    let corpo = null;
    try {
        corpo = await resposta.json();
    } catch {
        // resposta sem JSON: segue com corpo = null
    }

    if (!resposta.ok) {
        let mensagem = (corpo && corpo.mensagem) || `Erro inesperado (${resposta.status}).`;
        if (resposta.status === 401) {
            // token ausente, inválido ou expirado: descarta; a tela de gerenciamento
            // olha o status 401 e leva o usuário de volta para o login
            localStorage.removeItem('token');
            mensagem = 'Sessão inválida ou expirada. Faça login novamente.';
        }
        const erro = new Error(mensagem);
        erro.status = resposta.status;
        throw erro;
    }

    return corpo;
}

export function listarEventos(filtros) {
    return requisicao(`/eventos${montarQuery(filtros)}`);
}

export function criarEvento(evento) {
    return requisicao('/eventos', { method: 'POST', body: JSON.stringify(evento) });
}

export function atualizarEvento(id, evento) {
    return requisicao(`/eventos/${id}`, { method: 'PUT', body: JSON.stringify(evento) });
}

export function excluirEvento(id) {
    return requisicao(`/eventos/${id}`, { method: 'DELETE' });
}
