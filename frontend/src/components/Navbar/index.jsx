//Styles
import { NavContainer, LinksContainer } from "./styles";

import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

// Hooks
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Redux
import { logout , reset } from "../../slices/authSlice";

export function Navbar() {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate()
  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())


    navigate('/login')

  }

  return (
    <>
      <NavContainer>
        <Link to="/">ReactGram</Link>

        <form>
          <BsSearch />
          <input type="text" placeholder="Pesquisar" />
        </form>
        <LinksContainer>
          {auth ? (
            <>
              <li>
                <NavLink to="/">
                  <BsHouseDoorFill />
                </NavLink>
              </li>

              {user && (
                <li>
                  <NavLink to={`/users/${user._id}`}>
                    <BsFillCameraFill />
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink to="/profile">
                  <BsFillPersonFill />
                </NavLink>
              </li>

              <li>
                <span onClick={handleLogout}>Sair</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Entrar</NavLink>
              </li>

              <li>
                <NavLink to="/register">Registrar</NavLink>
              </li>
            </>
          )}
        </LinksContainer>
      </NavContainer>
    </>
  );
}
