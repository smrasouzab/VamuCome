import Modal from "react-bootstrap/esm/Modal";
import ButtonBs from "react-bootstrap/esm/Button";
import { Button, Container, ContainerModal, Header, Produtos } from "./styles";
import Input from "../../components/Input";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeProvidder";
import { useAuth } from "../../context/AuthProvider";
import api from "../../api";
import { useForm } from "react-hook-form";
import { Slide, toast } from "react-toastify";

export interface Produto {
  idProduto: number;
  nmProduto: string;
  vlProduto: number;
  dsProduto: string;
  urlFotoProduto: string;
}

const ProdFornecedor = () => {
  const { user } = useAuth();

  const { theme } = useTheme();

  const { register, handleSubmit, reset } = useForm<Produto>();

  const [produtos, setProdutos] = useState([] as Produto[]);

  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleCloseCadastro = () => setShowModalCadastro(false);
  const handleShowCadastro = () => {
    reset({
      idProduto: 0,
      nmProduto: "",
      vlProduto: 0,
      dsProduto: "",
      urlFotoProduto: "",
    });
    setShowModalCadastro(true);
  };
  const handleCloseEditar = () => setShowModalEditar(false);
  const handleShowEditar = (id: number) => {
    produtos.forEach((produto) => {
      if (produto.idProduto === id) {
        reset(produto);
      }
    });
    setShowModalEditar(true);
  };

  const popularProdutos = useCallback(() => {
    api
      .get(`/fornecedor/produto/todos-por-fornecedor/${user.id}`)
      .then((response) => {
        setProdutos(response.data);
      })
      .catch(() => {
        toast.error("Erro ao carregar produtos", {
          transition: Slide,
        });
      });
  }, [user?.id]);

  const handleSubmitCadastro = (data: Produto) => {
    api
      .post("/fornecedor/produto/cadastrar", data)
      .then(() => {
        toast.success("Produto cadastrado com sucesso!", {
          transition: Slide,
        });
        reset();
        handleCloseCadastro();
        popularProdutos();
      })
      .catch(() => {
        toast.error("Erro ao cadastrar produto", {
          transition: Slide,
        });
      });
  };

  const handleSubmitEditar = (data: Produto) => {
    api
      .put(`/fornecedor/produto/atualizar/${data.idProduto}`, data)
      .then(() => {
        toast.success("Produto editado com sucesso!", {
          transition: Slide,
        });
        reset();
        handleCloseEditar();
        popularProdutos();
      })
      .catch(() => {
        toast.error("Erro ao editar produto", {
          transition: Slide,
        });
      });
  };

  useEffect(() => {
    if (!user?.id) return;
    popularProdutos();
  }, [popularProdutos, user?.id]);

  return (
    <Container>
      <Header>
        <span className="title">Produtos</span>
        <Button type="button" onClick={handleShowCadastro}>
          Adicionar Produto
        </Button>
      </Header>
      <Produtos>
        {produtos.map((produto) => (
          <div className="item" key={produto.idProduto}>
            <div className="fotoNome">
              <img src="listagem/image.png" alt={"Imagem Produto " + produto.nmProduto} />
              <div className="nomeValor">
                <span className="nome">{produto.nmProduto}</span>
                <span className="preco">R$ {produto.vlProduto.toFixed(2)}</span>
                <span className="descricao">{produto.dsProduto}</span>
              </div>
            </div>
            <Button
              type="button"
              onClick={() => handleShowEditar(produto.idProduto)}
            >
              Editar Produto
            </Button>
          </div>
        ))}
      </Produtos>

      <Modal
        show={showModalCadastro}
        onHide={handleCloseCadastro}
        data-bs-theme={theme}
        centered
      >
        <Modal.Header style={{ border: "none" }}>
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleSubmitCadastro)}>
            <ContainerModal>
              <div className="linha">
                <Input
                  type="text"
                  label="Nome do Produto"
                  placeholder="Nome do Produto"
                  {...register("nmProduto")}
                  style={{
                    width: "200px",
                  }}
                />
                <Input
                  type="number"
                  label="Valor do Produto"
                  placeholder="Valor do Produto"
                  {...register("vlProduto")}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
              <div className="linha">
                <Input
                  type="text"
                  label="Descrição do Produto"
                  placeholder="Descrição do Produto"
                  {...register("dsProduto")}
                  style={{
                    width: "200px",
                  }}
                />
                <Input
                  type="text"
                  label="Foto do Produto"
                  placeholder="URL da Foto do Produto"
                  {...register("urlFotoProduto")}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </ContainerModal>
            <Modal.Footer style={{ border: "none" }}>
              <ButtonBs
                variant={theme === "light" ? "dark" : "light"}
                onClick={handleCloseCadastro}
              >
                Cancelar
              </ButtonBs>
              <ButtonBs type="submit" variant="warning">
                Cadastrar Produto
              </ButtonBs>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalEditar}
        onHide={handleCloseEditar}
        data-bs-theme={theme}
        centered
      >
        <Modal.Header style={{ border: "none" }}>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleSubmitEditar)}>
            <ContainerModal>
              <div className="linha">
                <Input
                  type="text"
                  label="Nome do Produto"
                  placeholder="Nome do Produto"
                  {...register("nmProduto")}
                  style={{
                    width: "200px",
                  }}
                />
                <Input
                  type="number"
                  label="Valor do Produto"
                  placeholder="Valor do Produto"
                  {...register("vlProduto")}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
              <div className="linha">
                <Input
                  type="text"
                  label="Descrição do Produto"
                  placeholder="Descrição do Produto"
                  {...register("dsProduto")}
                  style={{
                    width: "200px",
                  }}
                />
                <Input
                  type="text"
                  label="Foto do Produto"
                  placeholder="URL da Foto do Produto"
                  {...register("urlFotoProduto")}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </ContainerModal>
            <Modal.Footer style={{ border: "none" }}>
              <ButtonBs
                variant={theme === "light" ? "dark" : "light"}
                onClick={handleCloseEditar}
              >
                Cancelar
              </ButtonBs>
              <ButtonBs type="submit" variant="warning">
                Editar Produto
              </ButtonBs>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProdFornecedor;
