// import Navbar from "../../components/Navbar";
import { Container, Categorias } from "./styles";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Container>
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