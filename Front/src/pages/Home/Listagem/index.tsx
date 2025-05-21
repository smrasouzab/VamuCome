import { Container, Filtro, Listagem } from "./styles";

const HomeListagem = () => {
  return (
    <>
      <Container>
        <Filtro>
          <div className="btnFiltro">
            <img src="filtros/emoji-pizza.svg" alt="" />
          </div>
          <div className="btnFiltro">
            <img src="filtros/emoji-hamburguer.svg" alt="" />
          </div>
          <div className="btnFiltro">
            <img src="filtros/emoji-sushi.svg" alt="" />
          </div>
          <div className="btnFiltro">
            <img src="filtros/emoji-macarrao.svg" alt="" />
          </div>
          <div className="btnFiltro">
            <img src="filtros/emoji-salada.svg" alt="" />
          </div>
          <div className="btnFiltro">
            <img src="filtros/emoji-bolo.svg" alt="" />
          </div>
          <div className="btnFiltro">
            <img src="filtros/emoji-pizza.svg" alt="" />
          </div>
          <div className="btnFiltro">
            <img src="filtros/emoji-hamburguer.svg" alt="" />
          </div>
          <div className="btnFiltro">
            <img src="filtros/emoji-sushi.svg" alt="" />
          </div>
          <div className="btnFiltro">
            <img src="filtros/emoji-macarrao.svg" alt="" />
          </div>
          <div className="btnFiltro">
            <img src="filtros/emoji-salada.svg" alt="" />
          </div>
          <div className="btnFiltro">
            <img src="filtros/emoji-bolo.svg" alt="" />
          </div>
        </Filtro>
        <Listagem>
          <span className="title">Culinária ...</span>
          <div className="lista">
            <div className="card">
              <img src="listagem/image.png" alt="" />
            </div>
            <div className="card">
              <img src="listagem/image.png" alt="" />
            </div>
            <div className="card">
              <img src="listagem/image.png" alt="" />
            </div>
            <div className="card">
              <img src="listagem/image.png" alt="" />
            </div>
            <div className="card">
              <img src="listagem/image.png" alt="" />
            </div>
          </div>
        </Listagem>
      </Container>
    </>
  )
}

export default HomeListagem;