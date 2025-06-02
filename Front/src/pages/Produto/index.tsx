import { useEffect, useState } from "react";
import { AddCarrinho, Button, Container, Header } from "./styles";
import { FaArrowLeft } from "react-icons/fa6";
import { Slide, toast } from "react-toastify";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Modal from "react-bootstrap/esm/Modal";
import ButtonBs from "react-bootstrap/esm/Button";
import { useNavigate, useSearchParams } from "react-router";
import api from "../../api";

export interface Produto {
  idProduto: number;
  nmProduto: string;
  dsProduto: string;
  vlProduto: number;
}

const Produto = () => {
  const navigate = useNavigate();

  const [counter, setCounter] = useState<number>(1);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleIncrement = () => {
    setCounter((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (counter > 1) {
      setCounter((prev) => prev - 1);
    } else {
      toast.error("O mínimo para o pedido é 1", {
        transition: Slide,
      });
    }
  };

  const [searchParams] = useSearchParams();

  const [produto, setProduto] = useState<Produto>({} as Produto);

  const handleAddToCart = () => {
    const existingItem = JSON.parse(localStorage.getItem(`carrinho${searchParams.get('l')}`) || '[]');
    existingItem.push({
      idProduto: produto.idProduto,
      nmProduto: produto.nmProduto,
      dsProduto: produto.dsProduto,
      vlItem: produto.vlProduto,
      qtItem: counter,
      vlTotalItemPedido: produto.vlProduto * counter,
    });

    localStorage.setItem(`carrinho${searchParams.get('l')}`, JSON.stringify(existingItem));

    handleShow();
  };

  const handleContinuarComprando = () => {
    handleClose();
    navigate(`/loja?l=${searchParams.get('l')}`);
  }

  const handleIrParaCarrinho = () => {
    handleClose();
    navigate('/carrinho');
  };

  useEffect(() => {
    api
      .get('/fornecedor/produto/todos-por-fornecedor/' + searchParams.get('l'))
      .then((response) => {
        response.data.forEach((produto: Produto) => {
          if (produto.idProduto === Number(searchParams.get('p'))) {
            setProduto(produto);
          }
        })
      })
  }, [searchParams]);

  return (
    <Container>
      <Header>
        <button className="btnVoltar" onClick={() => window.history.back()}>
          <FaArrowLeft />
          Voltar
        </button>
        <div className="informacoesProduto">
          <img src="listagem/image.png" alt="Produto" />
          <div className="informacoes">
            <span className="title">{produto.nmProduto}</span>
            <span className="preco">R$ {produto.vlProduto}</span>
            <span className="descricao">{produto.dsProduto}</span>
          </div>
        </div>
        <AddCarrinho>
          <span className="preco">R$ {produto.vlProduto * counter}</span>
          <div className="quantidade">
            <button onClick={handleDecrement}>
              <FaMinus size={25} />
            </button>
            <span>{counter}</span>
            <button onClick={handleIncrement}>
              <FaPlus size={25} />
            </button>
          </div>
          <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
        </AddCarrinho>
      </Header>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header style={{ border: "none" }}>
          <Modal.Title>Produto Adicionado!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingBottom: "0", paddingTop: "0" }}>
          O produto foi adicionado ao seu carrinho com sucesso!
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <ButtonBs variant="dark" onClick={handleIrParaCarrinho}>
            Ir para o Carrinho
          </ButtonBs>
          <ButtonBs variant="warning" onClick={handleContinuarComprando}>
            Continuar Comprando
          </ButtonBs>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Produto;

