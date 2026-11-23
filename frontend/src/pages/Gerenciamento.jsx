import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { CadastrarEvento } from '../components/CadastroEvento';
import { GerirEventos } from '../components/GerenciamentoEventos';
import { listarEventos, criarEvento, atualizarEvento, excluirEvento } from '../services/api';

import '../styles/App.css';

function Gerenciamento() {
  const navigate = useNavigate();

  const [eventos, setEventos] = useState([]);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [filtros, setFiltros] = useState({});
  const [erro, setErro] = useState('');

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  // Se o backend responder 401 (token inválido/expirado), volta para o login.
  // Qualquer outro erro aparece no aviso vermelho no topo da página.
  const tratarErro = useCallback((e) => {
    if (e.status === 401) {
      handleLogout();
      return;
    }
    setErro(e.message);
  }, [handleLogout]);

  // carrega a lista do backend ao abrir a página
  useEffect(() => {
    listarEventos()
      .then((lista) => setEventos(lista))
      .catch(tratarErro);
  }, [tratarErro]);

  // recarrega a lista respeitando a última busca feita
  const recarregar = async () => {
    const lista = await listarEventos(filtros);
    setEventos(lista);
  };

  // devolve true se salvou (o formulário só limpa quando der certo)
  const handleSalvarOuAtualizar = async (eventoObjeto) => {
    try {
      if (eventoEditando) {
        await atualizarEvento(eventoEditando.id, eventoObjeto);
        setEventoEditando(null);
      } else {
        await criarEvento(eventoObjeto);
      }
      await recarregar();
      setErro('');
      return true;
    } catch (e) {
      tratarErro(e);
      return false;
    }
  };

  const handleDeletarEvento = async (id) => {
    try {
      await excluirEvento(id);
      await recarregar();
      setErro('');
    } catch (e) {
      tratarErro(e);
    }
  };

  const handleIniciarEdicao = (evento) => {
    setEventoEditando(evento);
  };

  const handleBuscar = async (novosFiltros) => {
    try {
      setFiltros(novosFiltros);
      const lista = await listarEventos(novosFiltros);
      setEventos(lista);
      setErro('');
    } catch (e) {
      tratarErro(e);
    }
  };

  return (
    <div className="pagina-gerenciamento">
      <div className="area-logout">
        <button id="btnLogout" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>Logout
        </button>
      </div>

      {erro && (
        <div
          role="alert"
          style={{
            background: '#ffe5e5',
            color: '#a00000',
            border: '1px solid #a00000',
            borderRadius: '8px',
            padding: '10px 16px',
            margin: '12px 24px'
          }}
        >
          {erro}
        </div>
      )}

      <div className="container-principal">
        <div className="coluna-esquerda">
          <CadastrarEvento
            aoSalvar={handleSalvarOuAtualizar}
            eventoEditando={eventoEditando}
          />
        </div>
        <div className="coluna-direita">
          <GerirEventos
            listaEventos={eventos}
            aoDeletar={handleDeletarEvento}
            aoEditar={handleIniciarEdicao}
            aoBuscar={handleBuscar}
          />
        </div>
      </div>
    </div>
  );
}

export default Gerenciamento;
