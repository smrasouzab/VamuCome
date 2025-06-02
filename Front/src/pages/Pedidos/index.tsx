import { Container, PedidoAtual, PedidosAnterior } from './styles';

const Pedidos = () => {
  return (
    <Container>
      <div style={{ width: "80%" }}>
        <h1>Pedido Atual</h1>
      </div>
      <PedidoAtual>
        <div className="status">
          <span>Status: Em Preparação</span>
        </div>
        <div className="pedido">
          <span className="numeroPedido">Pedido #123</span>
          <div className="informacoes">
            <span><span className="bold">Subtotal:</span> R$ 99,90</span>
            <span><span className="bold">Taxa de Entrega:</span> R$ 9,90</span>
            <span><span className="bold">Subtotal:</span> R$ 109,80</span>
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
                <div className="fotoNome">
                  <img src="listagem/image.png" alt="Produto" />
                  <span>Nome</span>
                </div>
                <span>Quantidade: 1</span>
              </div>
              <div className="item">
                <div className="fotoNome">
                  <img src="listagem/image.png" alt="Produto" />
                  <span>Nome</span>
                </div>
                <span>Quantidade: 1</span>
              </div>
              <div className="item">
                <div className="fotoNome">
                  <img src="listagem/image.png" alt="Produto" />
                  <span>Nome</span>
                </div>
                <span>Quantidade: 1</span>
              </div>
            </div>
          </div>
        </div>
      </PedidoAtual>
      <div style={{ width: "80%" }}>
        <h1>Pedidos Anteriores</h1>
      </div>
      <PedidosAnterior>
        <div className="pedido">
          <span className="numeroPedido">Pedido #123</span>
          <div className="informacoes">
            <span><span className="bold">Subtotal:</span> R$ 99,90</span>
            <span><span className="bold">Taxa de Entrega:</span> R$ 9,90</span>
            <span><span className="bold">Subtotal:</span> R$ 109,80</span>
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
                <div className="fotoNome">
                  <img src="listagem/image.png" alt="Produto" />
                  <span>Nome</span>
                </div>
                <span>Quantidade: 1</span>
              </div>
              <div className="item">
                <div className="fotoNome">
                  <img src="listagem/image.png" alt="Produto" />
                  <span>Nome</span>
                </div>
                <span>Quantidade: 1</span>
              </div>
              <div className="item">
                <div className="fotoNome">
                  <img src="listagem/image.png" alt="Produto" />
                  <span>Nome</span>
                </div>
                <span>Quantidade: 1</span>
              </div>
            </div>
          </div>
        </div>
      </PedidosAnterior>
    </Container>
  )
};

export default Pedidos;