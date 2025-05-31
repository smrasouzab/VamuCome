import { FaMinus, FaPlus, FaRegCopy, FaX } from "react-icons/fa6";
import {
  Button,
  Cartao,
  Container,
  DadosPagamento,
  DetalhesPedido,
  FormasPagamento,
  Grid,
  Nenhum,
  Pix,
} from "./styles";
import { useState } from "react";
import { Slide, toast } from "react-toastify";
import Input from "../../components/Input";

const TelaPagamento = () => {
  const [counter, setCounter] = useState<number>(1);

  const [metodo, setMetodo] = useState("");

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
          <button type="button" onClick={() => setMetodo('pix')}>Pix</button>
          <button type="button" onClick={() => setMetodo('cartaoCredito')}>Cartão de Crédito</button>
          <button type="button" onClick={() => setMetodo('cartaoDebito')}>Cartão de Débito</button>
          <button type="button" onClick={() => setMetodo('dinheiro')}>Dinheiro</button>
        </FormasPagamento>
        <DadosPagamento>
          {metodo === '' && (
            <Nenhum>
              <span className="title">Você não selecionou nenhum método de pagamento!</span>
            </Nenhum>
          )}
          {metodo === 'pix' && (<Pix>
            <span className="title">Pagamento por Pix</span>
            <span>
              Valor do Pedido: <span className="bold">R$ 109,80</span>
            </span>
            <div className="qrcode">
              <img src="formasPagamento\qrcode.svg" alt="QR Code do Pix" />
            </div>
            <Button className="icon">Copiar Chave Pix <FaRegCopy /></Button>
          </Pix>)}
          {metodo === 'cartaoCredito' && (<Cartao>
            <span className="title">Cartão de Crédito</span>
            <div className="grid">

              <div className="div1">
                <Input
                  type="text"
                  label="Número do Cartão"
                  placeholder="0000 0000 0000 0000"
                  style={{
                    width: "400px",
                  }}
                />
              </div>
              <div className="div2">
                <Input
                  type="text"
                  label="Nome do Titular"
                  placeholder="Nome do Titular"
                  style={{
                    width: "400px",
                  }}
                />
              </div>
              <div className="div3">
                <Input
                  type="text"
                  label="Validade"
                  placeholder="MM/AA"
                  style={{
                    width: "200px",
                  }}
                />
              </div>
              <div className="div4">
                <Input
                  type="text"
                  label="Código de Segurança"
                  placeholder="000"
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </div>
          </Cartao>)}
          {metodo === 'cartaoDebito' && (<Cartao>
            <span className="title">Cartão de Débito</span>
            <div className="grid">
              <div className="div1">
                <Input
                  type="text"
                  label="Número do Cartão"
                  placeholder="0000 0000 0000 0000"
                  style={{
                    width: "400px",
                  }}
                />
              </div>
              <div className="div2">
                <Input
                  type="text"
                  label="Nome do Titular"
                  placeholder="Nome do Titular"
                  style={{
                    width: "400px",
                  }}
                />
              </div>
              <div className="div3">
                <Input
                  type="text"
                  label="Validade"
                  placeholder="MM/AA"
                  style={{
                    width: "200px",
                  }}
                />
              </div>
              <div className="div4">
                <Input
                  type="text"
                  label="Código de Segurança"
                  placeholder="000"
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </div>
          </Cartao>)}
        </DadosPagamento>
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
