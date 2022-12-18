//Components
import { Link } from "react-router-dom";

//Styles
import { Container} from './styles'

export function Login() {

    function handleSubmit(e) {
        e.preventDefault();
      }
    
    
  return (


    <>
      <Container>
        <h2>ReactGram</h2>
        <p className="subtitle">
          {" "}
          Cadastre-se para ver fotos e vídeos dos seus amigos.{" "}
        </p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />
          <input type="submit" value="Entrar" />
        </form>
        <p>
          {" "}
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </Container>
    </>
  );
}
