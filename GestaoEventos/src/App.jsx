import { useState } from 'react';
import { CadastrarEvento } from './CadastroEvento';
import { GerirEventos } from './GerenciamentoEventos';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [eventos, setEventos] = useState([]);
  const handleSalvarEvento = (novoEvento) => {
    setEventos([...eventos, novoEvento]);
  };
  const handleDeletarEvento = (indexParaDeletar) => {
    setEventos(eventos.filter((_, index) => index !== indexParaDeletar));
  };

  return (
    <>
      <div className="container-principal">
        <div className="coluna-esquerda">
          <CadastrarEvento aoSalvar={handleSalvarEvento} />
        </div>
        <div className="coluna-direita">
          <GerirEventos listaEventos={eventos} aoDeletar={handleDeletarEvento} />
        </div>
      </div>
    </>
  );
}

export default App;