//Components
import { Link } from "react-router-dom";

//Hooks
import { useState, useEffect } from "react";

export function Register() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <h2>ReactGram</h2>

      <p> Cadastre-se para ver fotos e vídeos dos seus amigos. </p>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirme a senha" />
        <input type="submit" value="Cadastrar" />
      </form>

      <p> Tem uma conta? <Link to="/login">Conecte-se</Link></p>
    </>
  );
}
