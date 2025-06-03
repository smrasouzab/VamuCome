import { NavbarContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import ThemeSelector from "../ThemeSelector";
import { FaUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvidder";
import Button from "react-bootstrap/esm/Button";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  const { theme } = useTheme();

  const navigate = useNavigate();

  const [openCard, setOpenCard] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    Promise.resolve(isAuthenticated).then((result) => {
      setAuth(result);
    });
  }, [isAuthenticated]);

  const paginaInicial = () => {
    navigate("/home");
  };

  return (
    <NavbarContainer>
      <img
        src={theme === "light" ? "logo.svg" : "logo-white.svg"}
        alt="Logomarca da empresa VamuCome - Ir para a página inicial"
        onClick={paginaInicial}
      />
      {/* <NavbarNavlinkContainer>
        <NavbarNavlink to="/register">CRIAR CONTA</NavbarNavlink>
        <NavbarNavlink to="/login">ENTRAR</NavbarNavlink>
        <NavbarNavlink to="/user">CONTA</NavbarNavlink>
      </NavbarNavlinkContainer> */}
      <div></div>
      <div className="user">
        <div className="userBtn" onClick={() => setOpenCard((prev) => !prev)}>
          <FaUser size={24} />
        </div>
        {openCard &&
          (auth ? (
            <div className="card">
              {user.role === "CLIENTE" && (
                <>
                  <NavLink to="/user">Conta</NavLink>
                  <NavLink to="/pedidos">Pedidos</NavLink>
                </>
              )}
              {user.role === "FORNECEDOR" && (
                <>
                  <NavLink to="/user">Conta</NavLink>
                  <NavLink to="/pedidos-fornecedor">Pedidos</NavLink>
                  <NavLink to="/produtos">Produtos</NavLink>
                </>
              )}
              <Button variant="danger" type="button" onClick={logout}>
                SAIR
              </Button>
              <ThemeSelector />
            </div>
          ) : (
            <div className="cardDeslogado">
              <span>
                Você não está logado, tente{" "}
                <NavLink
                  to="/login"
                  className="amarelo"
                  onClick={() => setOpenCard(false)}
                >
                  Entrar
                </NavLink>
              </span>
              <ThemeSelector />
            </div>
          ))}
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
