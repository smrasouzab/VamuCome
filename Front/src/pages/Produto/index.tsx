import { useState } from "react";
import { AddCarrinho, Button, Container, Header } from "./styles";
import { FaArrowLeft } from "react-icons/fa6";
import { Slide, toast } from "react-toastify";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Modal from "react-bootstrap/esm/Modal";
import ButtonBs from "react-bootstrap/esm/Button";

const Produto = () => {
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
            <span className="title">Nome do Produto</span>
            <span className="preco">R$ 99,90</span>
            <span className="descricao">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
              deserunt quam id, labore, dignissimos iure pariatur sapiente,
              voluptatibus accusantium esse ex quos veritatis dolorum aperiam
              minima. Voluptate numquam eum accusantium enim minima saepe sequi
              expedita autem quibusdam ab earum et quia sed, sint ipsa adipisci
              aspernatur placeat! A similique illum natus sint quibusdam
              dolorem, voluptate incidunt pariatur autem magnam voluptatibus?
            </span>
          </div>
        </div>
      </Header>
      <AddCarrinho>
        <span className="preco">R$ 99,90</span>
        <div className="quantidade">
          <button onClick={handleDecrement}>
            <FaMinus size={25} />
          </button>
          <span>{counter}</span>
          <button onClick={handleIncrement}>
            <FaPlus size={25} />
          </button>
        </div>
        <Button onClick={handleShow}>Adicionar ao Carrinho</Button>
      </AddCarrinho>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header style={{ border: "none" }}>
          <Modal.Title>Produto Adicionado!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingBottom: "0", paddingTop: "0" }}>
          O produto foi adicionado ao seu carrinho com sucesso!
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <ButtonBs variant="dark" onClick={handleClose}>
            Ir para o Carrinho
          </ButtonBs>
          <ButtonBs variant="warning" onClick={handleClose}>
            Continuar Comprando
          </ButtonBs>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Produto;
