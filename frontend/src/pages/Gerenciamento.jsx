
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CadastrarEvento } from '../components/CadastroEvento';
import { GerirEventos } from '../components/GerenciamentoEventos';

import '../styles/App.css';

function Gerenciamento() {

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
};

  const [eventos, setEventos] = useState([]);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [indexEditando, setIndexEditando] = useState(null);

  const handleSalvarOuAtualizar = (eventoObjeto) => {
    if (indexEditando !== null) {
      const novaLista = [...eventos];
      novaLista[indexEditando] = eventoObjeto;

      setEventos(novaLista);
      setIndexEditando(null);
      setEventoEditando(null);
    } else {
      setEventos([...eventos, eventoObjeto]);
    }
  };

  const handleDeletarEvento = (indexParaDeletar) => {
    setEventos(
      eventos.filter((_, index) => index !== indexParaDeletar)
    );
  };

  const handleIniciarEdicao = (evento, index) => {
    setEventoEditando(evento);
    setIndexEditando(index);
  };

  return (
    <div className="pagina-gerenciamento">
               <div className="area-logout"><button id="btnLogout" onClick={handleLogout}><span class="material-symbols-outlined">logout</span>Logout</button></div>
               
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
          />
        </div>

      </div>
    </div>
  );
}

export default Gerenciamento;
