import { useEffect, useState } from 'react';
import { Button, Container, Header, Itens } from './styles';
import { Slide, toast } from 'react-toastify';
import { FaMinus, FaPlus, FaX } from 'react-icons/fa6';
import { useNavigate, useSearchParams } from 'react-router';
import api from '../../api';

export interface ItemCarrinho {
  idProduto: number;
  nmProduto: string;
  dsProduto: string;
  vlItem: number;
  qtItem: number;
  vlTotalItemPedido: number;
}

export interface Loja {
  dsRazaoSocial: string;
}

const Carrinho = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [carrinho, setCarrinho] = useState([] as ItemCarrinho[]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loja, setLoja] = useState<Loja>({} as any);

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

  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem(`carrinho${searchParams.get('l')}`) || '[]');

    setCarrinho(carrinho);

    if (carrinho.length === 0) {
      toast.info("Seu carrinho está vazio!", {
        transition: Slide,
      });
    }

    api
      .get<Loja>('/fornecedor/' + searchParams.get('l'))
      .then((response) => {
        setLoja(response.data);
      })

  }, [searchParams]);

  return (
    <Container>
      <Header>
        <span className='title'>Carrinho - {loja.dsRazaoSocial}</span>
        <Button
          type='button'
          onClick={() => navigate(`/tela-pagamento?l=${searchParams.get('l')}`)}
        >
          Ir para Pagamento
        </Button>
      </Header>
      <Itens>
        <div className="itens">
          {carrinho.length === 0 && (
            <span className="nenhumItem">Nenhum item no carrinho</span>
          )}
          {carrinho.map((item: ItemCarrinho) => (
            <div className="item">
              <button className="btnRemover" onClick={() => handleRemoveItem(item.idProduto)}>
                <FaX size={10} />
              </button>
              <div className="fotoNome">
                <img src="listagem/image.png" alt="Produto" />
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
      </Itens>
    </Container>
  )
}

export default Carrinho;