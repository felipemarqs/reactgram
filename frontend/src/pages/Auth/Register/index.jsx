//Components
import { Link } from "react-router-dom";

//Styles
import { Container } from "./styles";

//Hooks
import { useState, useEffect } from "react";
import { useSelector , useDispatch} from 'react-redux'

//Redux

import { register, reset } from "../../../slices/authSlice";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading , error } = useSelector((state) => state.auth);



  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    //console.log(user);

    dispatch(register(user))
  }

  //Clear all states
  useEffect(() => {

    dispatch(reset())

  }, [dispatch])

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
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
           type="password"
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            />
          <input type="submit" value="Cadastrar" />
        </form>
        <p>
          {" "}
          Tem uma conta? <Link to="/login">Conecte-se</Link>
        </p>
      </Container>
    </>
  );
}
