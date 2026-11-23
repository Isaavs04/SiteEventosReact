
const API_URL = 'http://localhost:3000';

export async function fazerLogin(email, senha) {
  const resposta = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao realizar login.');
  }

  return dados;
}
