import { NavbarContainer, NavbarNavlink, NavbarNavlinkContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import ThemeSelector from "../ThemeSelector";

const Navbar = () => {
  const navigate = useNavigate();

  const paginaInicial = () => {
    navigate("/home");
  };

  return (
    <NavbarContainer>
      <img src="logo.png" alt="Logomarca da empresa VamuCome - Ir para a página inicial" onClick={paginaInicial} />
      <NavbarNavlinkContainer>
        <NavbarNavlink to="/home">HOME</NavbarNavlink>
        <NavbarNavlink to="/register">CRIAR CONTA</NavbarNavlink>
        <NavbarNavlink to="/login">ENTRAR</NavbarNavlink>
        <NavbarNavlink to="/user">CONTA</NavbarNavlink>
      </NavbarNavlinkContainer>
      <ThemeSelector />
    </NavbarContainer>
  )
}

export default Navbar;