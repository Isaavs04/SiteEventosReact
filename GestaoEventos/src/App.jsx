import { useState } from 'react';
import { CadastrarEvento } from './CadastroEvento';
import { GerirEventos } from './GerenciamentoEventos';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
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
    setEventos(eventos.filter((_, index) => index !== indexParaDeletar));
  };
  const handleIniciarEdicao = (evento, index) => {
    setEventoEditando(evento);
    setIndexEditando(index);
  };

  return (
    <>
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
    </>
  );
}

export default App;