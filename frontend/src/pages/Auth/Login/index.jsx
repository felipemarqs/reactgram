//Components
import { Link } from "react-router-dom";
import { Message } from "../../../components/Message";

//Styles
import { Container } from "./styles";

//Hooks

import { useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { login , reset} from '../../../slices/authSlice'

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const { loading , error} = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user);

    dispatch(login(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <>
      <Container>
        <h2>ReactGram</h2>
        <p className="subtitle">
          {" "}
          Cadastre-se para ver fotos e vídeos dos seus amigos.{" "}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
          {!loading && <input type="submit" value="Entrar" />}
          {loading && <input type="submit" value="Entrando..." disabled />}

          {error && <Message msg={error} type="error" />}
        </form>
        <p>
          {" "}
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </Container>
    </>
  );
}
