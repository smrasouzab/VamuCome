import { FaMinus, FaPlus, FaX } from "react-icons/fa6";
import {
  Button,
  Container,
  DadosPagamento,
  DetalhesPedido,
  FormasPagamento,
  Grid,
} from "./styles";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

const TelaPagamento = () => {
  const [counter, setCounter] = useState<number>(1);

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
      <Grid>
        <FormasPagamento>
          <button>Pix</button>
          <button>Cartão de Crédito</button>
          <button>Cartão de Débito</button>
          <button>Dinheiro</button>
        </FormasPagamento>
        <DadosPagamento></DadosPagamento>
        <DetalhesPedido>
          <span className="title">#999 - Detalhes do Pedido</span>
          <div className="informacoes">
            <span>
              <span className="bold">Subtotal:</span> R$ 99,90
            </span>
            <span>
              <span className="bold">Taxa de Entrega:</span> R$ 9,90
            </span>
            <span>
              <span className="bold">Total:</span> R$ 109,80
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <span className="bold">Itens do Pedido:</span>
            <div className="itens">
              <div className="item">
                <button className="btnRemover">
                  <FaX size={10} />
                </button>
                <div className="fotoNome">
                  <img src="listagem/image.png" alt="Produto" />
                  <span>Nome</span>
                </div>
                <div className="quantidade">
                  <button onClick={handleDecrement}>
                    <FaMinus size={20} />
                  </button>
                  <span>{counter}</span>
                  <button onClick={handleIncrement}>
                    <FaPlus size={20} />
                  </button>
                </div>
              </div>
              <div className="item">Nome</div>
            </div>
          </div>
          <Button className="confirmar">Finalizar Pedido</Button>
        </DetalhesPedido>
      </Grid>
    </Container>
  );
};

export default TelaPagamento;
