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
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import Input from "../../components/Input";
import { useNavigate, useSearchParams } from "react-router";
import api from "../../api";

export interface ItemCarrinho {
  idProduto: number;
  nmProduto: string;
  dsProduto: string;
  vlItem: number;
  qtItem: number;
  vlTotalItemPedido: number;
}

const TelaPagamento = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [metodo, setMetodo] = useState('');

  const [carrinho, setCarrinho] = useState([] as ItemCarrinho[]);
  const [totalPedido, setTotalPedido] = useState(0);

  const calcularTotalPedido = (carrinho: ItemCarrinho[]) => {
    let total = 0;

    if (carrinho.length === 0) {
      setTotalPedido(0);
      return;
    }

    carrinho.forEach((item: ItemCarrinho) => {
      total += item.vlTotalItemPedido;
    });

    setTotalPedido(total);
  }

  const handleIncrement = (id: number) => {
    const existingItem = carrinho.find((item: ItemCarrinho) => item.idProduto === id);
    if (existingItem) {
      const updatedCarrinho = carrinho.map((item: ItemCarrinho) =>
        item.idProduto === id
          ? {
            ...item,
            qtItem: item.qtItem + 1,
            vlTotalItemPedido: item.vlItem * (item.qtItem + 1),
          }
          : item
      );
      setCarrinho(updatedCarrinho);
      localStorage.setItem(`carrinho${searchParams.get('l')}`, JSON.stringify(updatedCarrinho));
    } else {
      toast.error("Produto não encontrado no carrinho", {
        transition: Slide,
      });
    }
  };

  const handleDecrement = (id: number) => {
    const existingItem = carrinho.find((item: ItemCarrinho) => item.idProduto === id);
    if (existingItem && existingItem.qtItem > 1) {
      const updatedCarrinho = carrinho.map((item: ItemCarrinho) =>
        item.idProduto === id
          ? {
            ...item,
            qtItem: item.qtItem - 1,
            vlTotalItemPedido: item.vlItem * (item.qtItem - 1),
          }
          : item
      );
      setCarrinho(updatedCarrinho);
      localStorage.setItem(`carrinho${searchParams.get('l')}`, JSON.stringify(updatedCarrinho));
    } else if (existingItem && existingItem.qtItem === 1) {
      handleRemoveItem(id);
    } else {
      toast.error("Produto não encontrado no carrinho", {
        transition: Slide,
      });
    }
  };

  const handleRemoveItem = (id: number) => {
    const updatedCarrinho = carrinho.filter((item: ItemCarrinho) => item.idProduto !== id);
    setCarrinho(updatedCarrinho);
    localStorage.setItem(`carrinho${searchParams.get('l')}`, JSON.stringify(updatedCarrinho));
    toast.success("Item removido do carrinho", {
      transition: Slide,
    });
  }

  const handleFinalizarPedido = () => {
    if (carrinho.length === 0) {
      toast.error("Seu carrinho está vazio!", {
        transition: Slide,
      });
      return;
    }

    if (metodo === '') {
      toast.error("Selecione um método de pagamento!", {
        transition: Slide,
      });
      return;
    }

    api
      .post('cliente/pedido/cadastrar', {
        idFornecedor: searchParams.get('l'),
        tipoPagamento: metodo === 'pix' ? 'Pix' : metodo === 'cartaoCredito' ? 'Cartão de Crédito' : metodo === 'cartaoDebito' ? 'Cartão de Débito' : 'Dinheiro',
        itens: carrinho.map((item: ItemCarrinho) => ({
          idProduto: item.idProduto,
          qtItem: item.qtItem,
          // vlItem: item.vlItem,
          // vlTotalItemPedido: item.vlTotalItemPedido,
        })),
      })
      .then((response) => {
        toast.success("Pedido realizado com sucesso!", {
          transition: Slide,
        });
        localStorage.removeItem(`carrinho${searchParams.get('l')}`);
        localStorage.setItem('id-pedido', JSON.stringify(response.data.idPedido));
        localStorage.setItem('pedido-atual', JSON.stringify({
          idPedido: response.data.idPedido,
          timer: 80,
        }));
        navigate(`/pedidos`);
      })
      .catch(() => {
        toast.error("Erro ao realizar o pedido!", {
          transition: Slide,
        });
      });
  }

  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem(`carrinho${searchParams.get('l')}`) || '[]');

    setCarrinho(carrinho);

    if (carrinho.length === 0) {
      toast.info("Seu carrinho está vazio!", {
        transition: Slide,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    calcularTotalPedido(carrinho);
  }, [carrinho]);

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
              Valor do Pedido: <span className="bold">R$ {totalPedido}</span>
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
          {metodo === 'dinheiro' && (
            <Nenhum>
              <span className="title">Pague pessoalmente na entrega!</span>
            </Nenhum>
          )}
        </DadosPagamento>
        <DetalhesPedido>
          <span className="title">Detalhes do Pedido</span>
          <div className="informacoes">
            <span>
              <span className="bold">Total:</span> R$ {totalPedido}
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
              {carrinho.length === 0 && (
                <Nenhum>
                  <span className="nenhumItem">Nenhum item no carrinho</span>
                </Nenhum>
              )}
              {carrinho.map((item: ItemCarrinho) => (
                <div className="item" key={item.idProduto}>
                  <button className="btnRemover" onClick={() => handleRemoveItem(item.idProduto)}>
                    <FaX size={10} />
                  </button>
                  <div className="fotoNome">
                    <img src="listagem/image.png" alt={"Imagem Produto" + item.nmProduto} />
                    <span>{item.nmProduto}</span>
                  </div>
                  <div className="quantidade">
                    <button onClick={() => handleDecrement(item.idProduto)}>
                      <FaMinus size={20} />
                    </button>
                    <span>{item.qtItem}</span>
                    <button onClick={() => handleIncrement(item.idProduto)}>
                      <FaPlus size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button className="confirmar" onClick={handleFinalizarPedido}>Finalizar Pedido</Button>
        </DetalhesPedido>
      </Grid>
    </Container>
  );
};

export default TelaPagamento;
