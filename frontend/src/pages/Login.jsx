import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fazerLogin } from '../services/authService';
import '../styles/Login.css';

import Carrossel from "../components/Carrossel/Carrossel";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (evento) => {
    evento.preventDefault();

  try {
    setCarregando(true);
    setMensagem('');

    const dados = await fazerLogin(email, senha);

    localStorage.setItem('token', dados.token);

    navigate('/admin');

  } catch (erro) {
    setMensagem(erro.message);

  } finally {
    setCarregando(false);
  }
};

  return (
    <main className='pagina-login'>
      <title>Login</title>

    <div className="container">

        <div className="form">
            
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className="campo">
                <label htmlFor="txtEmail">Email</label>
                <input type="email" name="txtEmail" id="txtEmail" placeholder='Informe seu e-mail' value={email} onChange={(evento) => setEmail(evento.target.value)} required/>
            </div>

            <div className="campo">
                <label htmlFor="txtSenha">Senha</label>
                <input type="password" name="txtSenha" id="txtSenha" placeholder='Informe sua senha' value={senha} onChange={(evento) => setSenha(evento.target.value)} required/>
            </div>

            <button type="submit" id="btnEnviar" disabled={carregando}>{carregando ? 'Entrando...' : 'Acessar'}</button>
            {mensagem && <p>{mensagem}</p>}
          </form>
        </div>

        <div className="carrossel">
           <Carrossel />
        </div>
      </div>
    </main>
  );
}

export default Login;
