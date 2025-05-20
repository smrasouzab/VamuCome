// import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import { Container, Categorias } from "./styles";

const Home = () => {
  return (
    <>
      <Container>
        <SearchBar 
          placeholder="Busque aqui seus produtos"
          style={{
            width: "70%",
            height: "45px",
          }}
        />
        <Categorias>
          <img src="categorias/1.jpg" alt="" />
          <img src="categorias/2.jpg" alt="" />
          <img src="categorias/3.jpg" alt="" />
          <img src="categorias/4.jpg" alt="" />
        </Categorias>
      </Container>
    </>
  )
}

export default Home;