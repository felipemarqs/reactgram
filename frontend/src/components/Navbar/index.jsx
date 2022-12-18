//Styles
import { NavContainer, LinksContainer } from "./styles";

import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

export function Navbar() {
  return (
    <>
      <NavContainer>
        <Link to="/">ReactGram</Link>

        <form>
          <BsSearch />
          <input type="text" placeholder="Pesquisar"/>
        </form>
          <LinksContainer>

            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>

            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>

            <li>
              <NavLink to="/register">Registrar</NavLink>
            </li>
          </LinksContainer>
       
      </NavContainer>
    </>
  );
}
