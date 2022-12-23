//Components
import { Link } from "react-router-dom";
import { Message } from "../../../components/Message";

//Styles
import { Container } from "./styles";

//Hooks

import { useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
