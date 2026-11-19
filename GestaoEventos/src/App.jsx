import { useState } from 'react'
import { CadastrarEvento } from './CadastroEvento';
import { GerirEventos } from './GerenciamentoEventos';
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="container-principal">
      {/* Caixa da Esquerda */}
      <div className="coluna-esquerda">
        <CadastrarEvento />
      </div>
      {/* Caixa da Direita */}
      <div className="coluna-direita">
        <GerirEventos />
      </div>
    </div>
    </>
  )
}

export default App
