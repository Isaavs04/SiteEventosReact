import '../styles/Login.css';
import img from '../assets/img-telaLogin.svg'

function Login() {
  return (
    <main>
      <title>Login</title>

    <div className="container">

        <div className="form">
            
          
          <form>
            <h1>Login</h1>

            <div className="campo">
                <label htmlFor="txtEmail">Email*</label>
                <input type="email" name="txtEmail" id="txtEmail" placeholder='Informe seu e-mail' required/>
            </div>

            <div className="campo">
                <label htmlFor="txtSenha">Senha*</label>
                <input type="password" name="txtSenha" id="txtSenha" placeholder='Informe sua senha' required/>
            </div>

            <button type="submit" id="btnEnviar">Acessar</button>
          </form>
        </div>

        <div className="img">
            <img src={img} alt="imagem"></img>
        </div>

      </div>
    </main>
  );
}

export default Login;
