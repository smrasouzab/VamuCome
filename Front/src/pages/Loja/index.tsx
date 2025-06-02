import { useNavigate, useSearchParams } from "react-router";
import { Container } from "./styles";
import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "../../api";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";

export interface Loja {
  dsRazaoSocial: string;
  vlMinimoCompra: number;
}

export interface Produto {
  idProduto: number;
  nmProduto: string;
  dsProduto: string;
  vlProduto: number;
}

const Loja = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loja, setLoja] = useState<Loja>({} as any);
  const [listaProdutos, setListaProdutos] = useState([]);

  useEffect(() => {
    api
      .get<Loja>('/fornecedor/' + searchParams.get('l'))
      .then((response) => {
        setLoja(response.data);
      })

    api
      .get('/fornecedor/produto/todos-por-fornecedor/' + searchParams.get('l'))
      .then((response) => {
        setListaProdutos(response.data);
      })
  }, [searchParams]);

  return (
    <Container>
      <Header>
        <div className="loja-info">
          <img className="avatar" src="listagem/image.png" alt="Logo Loja" />
          <div>
            <h2>{loja.dsRazaoSocial}</h2>
            <div className="status">
              <span className="pedido-min">Pedido mín. R$ {loja.vlMinimoCompra}</span>
            </div>
          </div>
        </div>
      </Header>
      <Section>
        <h3 className="section-title">
          Produtos
        </h3>
        <div className="promocoes-list">
          {listaProdutos.map((produto: Produto) => (
            <PromocaoCard key={produto.idProduto} onClick={() => navigate(`/produto?l=${searchParams.get('l')}&p=${produto.idProduto}`)}>
              <div className="info">
                <span className="nome">{produto.nmProduto}</span>
                <span className="desc">{produto.dsProduto}</span>
                <span className="preco">R$ {produto.vlProduto.toFixed(2)}</span>
              </div>
              <img src="listagem/image.png" alt={produto.nmProduto} />
            </PromocaoCard>
          ))}
        </div>
      </Section>
    </Container>
  );
};

const Header = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-navbar);
  color: #fff;
  border-radius: 12px;
  padding: 42px;
  margin-bottom: 10px;

  .loja-info {
    display: flex;
    align-items: center;
    gap: 18px;

    .avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #fff;
    }
    
    h2 {
      font-family: "Jua", sans-serif;
      font-size: 2.8rem;
      margin-bottom: 2px;
      color: #fff;
    }

    .status {
      display: flex;
      gap: 16px;
      font-size: 1.3rem;

      .offline {
        color: #fff;
      }

      .pedido-min {
        color: #fff;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .loja-info {
      align-items: normal;
      flex-direction: column;

      .avatar {
        width: 75px;
        height: 75px;
      }

      h2 {
        font-size: 1.8rem;
      }

      .status {
        flex-direction: column;
        align-items: center;
      }
    }
  }
`;

const Section = styled.section`
  width: 80%;
  margin-bottom: 24px;

  .section-title {
    font-family: "Inter", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color);
    margin-bottom: 18px;
  }

  .destaques-list {
    display: flex;
    flex-direction: row;
    gap: 28px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  .promocoes-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
`;

const PromocaoCard = styled.div`
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 18px 18px 24px;
  min-height: 110px;
  border: 1px solid rgb(200, 200, 200);
  cursor: pointer;

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .nome {
      font-family: "Inter", sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color);
    }
    .desc {
      font-size: 0.95rem;
      color: #757575;
      font-weight: 400;
      margin-bottom: 2px;
      max-width: 350px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .preco-antigo {
      font-size: 0.95rem;
      color: #bdbdbd;
      text-decoration: line-through;
    }
    .preco {
      font-size: 1.2rem;
      color: var(--bg-navbar);
      font-weight: 700;
    }
  }

  img {
    width: 90px;
    height: 90px;
    object-fit: contain;
    border-radius: 10px;
    background: var(--bg-color);
  }

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: normal;
  }
`;

export default Loja;
