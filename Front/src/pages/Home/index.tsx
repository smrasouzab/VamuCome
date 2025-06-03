// import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Avaliacao from "../../components/Avaliacao";
import SearchBar from "../../components/SearchBar";
import { Container, Title, Listagem } from "./styles";
import { useNavigate } from "react-router";
import api from "../../api";
import { useAuth } from "../../context/AuthProvider";
import { Slide, toast } from "react-toastify";

export interface Fornecedor {
  idFornecedor: number;
  dsRazaoSocial: string;
  vlMinimoCompra: number;
}

const Home = () => {
  const { user } = useAuth();
  
  const navigate = useNavigate();

  const [showAvaliacao, setshowAvaliacao] = useState(false);

  const [search, setSearch] = useState("");

  const handleCardClick = (id: number) => {
    if (user.role !== "CLIENTE") {
      toast.error("Você precisa estar logado para acessar a loja.", {
        transition: Slide,
      });
      return;
    }
    navigate(`/loja?l=${id}`);
  };

  // const handleOpen = () => setshowAvaliacao(true);
  const handleClose = () => setshowAvaliacao(false);

  const [listaFornecedores, setListaFornecedores] = useState([]);

  useEffect(() => {
    api
      .get("/fornecedor/listar-todos")
      .then((response) => {
        if (search  === "" || search === undefined || search === null) {
          setListaFornecedores(response.data);
        } else {
          const filteredFornecedores = response.data.filter((fornecedor: Fornecedor) =>
            fornecedor.dsRazaoSocial.toLowerCase().includes(search.toLowerCase())
          );
          setListaFornecedores(filteredFornecedores);
        }
      })
  }, [search]);

  return (
    <>
      <Container>
        <Title>
          <h1 className="title1">Seu delivery favorito chegou.</h1>
          <h1 className="title2">Vamu.comê?</h1>
        </Title>
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Busque aqui seus produtos"
          style={{
            width: "80%",
            height: "45px",
          }}
        />
        <Listagem>
          <div className="lista">
            {listaFornecedores.map((fornecedor: Fornecedor) => (
              <div className="cardy" key={fornecedor.idFornecedor} onClick={() => handleCardClick(fornecedor.idFornecedor)}>
                <span className="labelFechado">Fechado</span>
                <img className="fotoFornecedor" src="listagem/image.png" alt="Imagem do Fornecedor" />
                <div className="informacoes">
                  <span className="nome">{fornecedor.dsRazaoSocial}</span>
                  <div className="tempoDistancia">
                    <span className="tempo">Pedido Mínimo:</span>
                    <span className="distancia">R$ {fornecedor.vlMinimoCompra}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Listagem>
      </Container>
      <Avaliacao showAvaliacao={showAvaliacao} handleClose={handleClose} />
    </>
  )
}

export default Home;