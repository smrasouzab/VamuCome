// import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import { Container, Categorias, Title, ListaCategorias } from "./styles";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const paginaListagem = () => {
    navigate("/home-listagem");
  };

  return (
    <>
      <Container>
        <Title>
          <h1 className="title1">Seu delivery favorito chegou.</h1>
          <h1 className="title2">Vamu.comê?</h1>
        </Title>
        <SearchBar 
          placeholder="Busque aqui seus produtos"
          style={{
            width: "80%",
            height: "45px",
          }}
        />
        <Categorias>
          <img onClick={paginaListagem} src="categorias/1.png" alt="" />
          <img onClick={paginaListagem} src="categorias/2.png" alt="" />
          <img onClick={paginaListagem} src="categorias/3.png" alt="" />
          <img onClick={paginaListagem} src="categorias/2.png" alt="" />
        </Categorias>
        <ListaCategorias>
          <div className="header">
            <span>Os melhores restaurantes para você</span>
            <button className="btnMin">Ver Todos</button>
          </div>
          <div className="categorias">
            <div className="card">
              <img src="listaCategorias/1.png" alt="" />
              <div className="text">
                <span className="nome">Culinária Asiática</span>
                <span className="restaurantes">+ 32 Restaurantes</span>
              </div>
            </div>
            <div className="card">
              <img src="listaCategorias/2.png" alt="" />
              <div className="text">
                <span className="nome">Saudáveis</span>
                <span className="restaurantes">+ 32 Restaurantes</span>
              </div>
            </div>
            <div className="card">
              <img src="listaCategorias/3.png" alt="" />
              <div className="text">
                <span className="nome">Lanches Rápidos</span>
                <span className="restaurantes">+ 32 Restaurantes</span>
              </div>
            </div>
            <div className="card">
              <img src="listaCategorias/4.png" alt="" />
              <div className="text">
                <span className="nome">Outro Tipo</span>
                <span className="restaurantes">+ 32 Restaurantes</span>
              </div>
            </div>
          </div>
        </ListaCategorias>
      </Container>
    </>
  )
}

export default Home;