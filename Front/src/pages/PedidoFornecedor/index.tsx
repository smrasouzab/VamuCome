import { useCallback, useEffect, useState } from "react";
import { Pedidos, Container, Header } from "./styles";
import api from "../../api";
import { useAuth } from "../../context/AuthProvider";
import { Slide, toast } from "react-toastify";

interface Pedido {
  idPedido: number;
  vlTotalPedido: number;
  statusPedido: string;
  tipoPagamento: string;
  itens: ItemPedido[];
  cliente: Cliente;
  fornecedor: Fornecedor;
}

interface ItemPedido {
  idItemPedido: number;
  qtItem: number;
  vlItem: number;
  vlTotalItemPedido: number;
  produto: Produto;
  pedido?: Pedido;
}

interface Produto {
  idProduto: number;
  nmProduto: string;
  vlProduto: number;
  dsProduto: string;
  urlFotoProduto: string | null;
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
  endereco: Endereco;
  produto: Produto[];
  enabled: boolean;
  authorities: Authority[];
  password: string;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

interface Cliente {
  idCliente: number;
  dsEmailCliente: string;
  dataCadastroCliente: string;
  nmUsuarioCliente: string;
  dsSenhaCliente: string;
  nuCPF: string;
  nuTelCliente: string;
  endereco: Endereco[];
  enabled: boolean;
  authorities: Authority[];
  password: string;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

interface Endereco {
  idEndereco: number;
  dsLogradouro: string;
  nmNumero: string;
  dsComplemento: string;
  endFavorito: boolean;
}

interface Authority {
  authority: string;
}

const PedidoFornecedor = () => {
  const { user } = useAuth();

  const [dados, setDados] = useState([] as Pedido[]);

  const popularPedidos = useCallback(async () => {
    await api
      .get<Pedido[]>("fornecedor/pedido/listar")
      .then((response) => {
        setDados(response.data);
        console.log(response.data);
      })
      .catch(() => {
        toast.error("Erro ao carregar pedidos", {
          transition: Slide,
        });
      });
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    popularPedidos();
  }, [popularPedidos, user?.id]);

  return (
    <Container>
      <Header>
        <span className="title">Pedidos</span>
      </Header>
      <Pedidos>
        {dados &&
          dados.map((pedido) => {
            return (
              <div className="item" key={pedido.idPedido}>
                <div className="fotoNome">
                  <div className="nomeValor">
                    <span className="nome">Pedido #{pedido.idPedido}</span>
                    <span className="campo">
                      Valor Total:{" "}
                      <span className="bold">
                        R$ {pedido.vlTotalPedido.toFixed(2)}
                      </span>
                    </span>
                    <span className="campo">
                      Cliente:{" "}
                      <span className="bold">
                        {pedido.itens[0].pedido?.cliente.nmUsuarioCliente}
                      </span>
                    </span>
                    <span className="campo">
                      Endereço:{" "}
                      <span className="bold">
                        {
                          pedido.itens[0].pedido?.cliente.endereco[0]
                            .dsLogradouro
                        }
                        , {pedido.itens[0].pedido?.cliente.endereco[0].nmNumero}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </Pedidos>
    </Container>
  );
};

export default PedidoFornecedor;
