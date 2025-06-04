import { useEffect, useState } from "react";
import { Container, PedidoAtual, PedidosAnterior } from "./styles";
import api from "../../api";
import { useAuth } from "../../context/AuthProvider";

interface Pedido {
  idPedido: number;
  vlTotalPedido: number;
  statusPedido: string;
  tipoPagamento: string;
  itens: ItemPedido[];
}

interface ItemPedido {
  idItemPedido: number;
  qtItem: number;
  vlItem: number;
  vlTotalItemPedido: number;
  produto: ProdutoPedido;
  pedido: PedidoInfo;
}

interface ProdutoPedido {
  idProduto: number;
  nmProduto: string;
  vlProduto: number;
  dsProduto: string;
  urlFotoProduto: string;
}

interface PedidoInfo {
  idPedido: number;
  vlTotalPedido: number;
  tipoPagamento: string;
  statusPedido: string;
  fornecedor: Fornecedor;
  cliente: Cliente;
}

interface Fornecedor {
  idFornecedor: number;
  dsEmailFornecedor: string;
  dataCadastroFornecedor: string;
  nmUsuarioFornecedor: string;
  dsSenhaFornecedor: string;
  dsRazaoSocial: string;
  nuCNPJ: string;
  dtHorarioAbertura: string;
  dtHorarioFechamento: string;
  vlMinimoCompra: number;
  urlFotoFornecedor: string | null;
  endereco: EnderecoFornecedor;
  produto: ProdutoPedido[];
  enabled: boolean;
  authorities: Authority[];
  password: string;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

interface EnderecoFornecedor {
  idEndereco: number;
  dsLogradouro: string;
  nmNumero: string;
  dsComplemento: string;
  endFavorito: boolean;
}

interface Authority {
  authority: string;
}

interface Cliente {
  idCliente: number;
  dsEmailCliente: string;
  dataCadastroCliente: string;
  nmUsuarioCliente: string;
  dsSenhaCliente: string;
  nuCPF: string;
  nuTelCliente: string;
  endereco: EnderecoCliente[];
  enabled: boolean;
  authorities: Authority[];
  password: string;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

interface EnderecoCliente {
  idEndereco: number;
  dsLogradouro: string;
  nmNumero: string;
  dsComplemento: string;
  endFavorito: boolean;
}

const Pedidos = () => {
  const { user } = useAuth();

  const [dadosPedidos, setdadosPedidos] = useState([] as Pedido[]);

  useEffect(() => {
    api.get<Pedido[]>("/cliente/pedido/listar").then((response) => {
      const formatedItems = [] as Pedido[];
      response.data.forEach((e: Pedido) => {
        if (String(e.itens[0].pedido.cliente.idCliente) === String(user.id)) {
          formatedItems.push(e);
        }
      })
      setdadosPedidos(formatedItems);
    });
  }, []);

  return (
    <Container>
      <div style={{ width: "80%" }}>
        <h1>Pedido Atual</h1>
      </div>
      <PedidoAtual>
        {dadosPedidos.map((pedido) => {
          if (
            pedido.statusPedido === "Entregue" ||
            pedido.statusPedido === "Cancelado"
          )
            return null;

          return (
            <>
              <div className="status">
                <span>Status: {pedido.statusPedido}</span>
              </div>
              <div className="pedido">
                <span className="numeroPedido">Pedido #{pedido.idPedido}</span>
                <div className="informacoes">
                  <span>
                    <span className="bold">Total:</span> R$ {pedido.vlTotalPedido.toFixed(2)}
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
                    {pedido.itens.map((item) => (
                      <div className="item" key={item.idItemPedido}>
                        <div className="fotoNome">
                          <img
                            src={item.produto.urlFotoProduto || "listagem/image.png"}
                            alt={"Produto " + item.produto.nmProduto}
                          />
                          <span>{item.produto.nmProduto}</span>
                        </div>
                        <span>Quantidade: {item.qtItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </PedidoAtual>
      <div style={{ width: "80%" }}>
        <h1>Pedidos Anteriores</h1>
      </div>
      <PedidosAnterior>
        {dadosPedidos.map((pedido) => {
          if (
            pedido.statusPedido !== "Entregue" &&
            pedido.statusPedido !== "Cancelado"
          )
            return null;

          return (
            <div className="pedido" key={pedido.idPedido}>
              <span className="numeroPedido">Pedido #{pedido.idPedido}</span>
              <div className="informacoes">
                <span>
                  <span className="bold">Subtotal:</span> R$ {pedido.vlTotalPedido.toFixed(2)}
                </span>
                <span>
                  <span className="bold">Tipo de Pagamento:</span> {pedido.tipoPagamento}
                </span>
                <span>
                  <span className="bold">Status:</span> {pedido.statusPedido}
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
                  {pedido.itens.map((item) => (
                    <div className="item" key={item.idItemPedido}>
                      <div className="fotoNome">
                        <img
                          src={item.produto.urlFotoProduto || "listagem/image.png"}
                          alt={"Produto " + item.produto.nmProduto}
                        />
                        <span>{item.produto.nmProduto}</span>
                      </div>
                      <span>Quantidade: {item.qtItem}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </PedidosAnterior>
    </Container>
  );
};

export default Pedidos;
