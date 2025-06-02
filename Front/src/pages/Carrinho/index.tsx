import { useEffect, useState } from 'react';
import { Button, Container, Header, Itens } from './styles';
import { Slide, toast } from 'react-toastify';
import { FaMinus, FaPlus, FaX } from 'react-icons/fa6';
import { useNavigate, useSearchParams } from 'react-router';

export interface ItemCarrinho {
  idProduto: number;
  nmProduto: string;
  dsProduto:  string;
  vlItem: number;
  qtItem: number;
  vlTotalItemPedido: number;
}

const Carrinho = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [counter, setCounter] = useState<number>(1);

  const [carrinho, setCarrinho] = useState([]);

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

  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem(`carrinho${searchParams.get('l')}`) || '[]');

    setCarrinho(carrinho);

    if (carrinho.length === 0) {
      toast.info("Seu carrinho está vazio!", {
        transition: Slide,
      });
    }
  }, [searchParams]);

  return (
    <Container>
      <Header>
        <span className='title'>Carrinho - Pizza da Casa</span>
        <Button
          type='button'
          onClick={() => navigate(`/tela-pagamento?l=${searchParams.get('l')}`)}
        >
          Ir para Pagamento
        </Button>
      </Header>
      <Itens>
        <div className="itens">
          {carrinho.map((item: ItemCarrinho) => (
            <div className="item">
            <button className="btnRemover">
              <FaX size={10} />
            </button>
            <div className="fotoNome">
              <img src="listagem/image.png" alt="Produto" />
              <span>{item.nmProduto}</span>
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
          ))}
        </div>
      </Itens>
    </Container>
  )
}

export default Carrinho;