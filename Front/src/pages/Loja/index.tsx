import { Container } from "./styles";
import styled from "styled-components";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";

const Loja = () => {
  return (
    <Container>
      {/* <Swiper
        slidesPerView={5}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper> */}
      <Header>
        <div className="loja-info">
          <img className="avatar" src="listagem/image.png" alt="Logo Loja" />
          <div>
            <h2>FNP Tubarao - Frango Frito</h2>
            <div className="status">
              <span className="offline">Offline</span>
              <span className="pedido-min">Pedido mín. R$ 8,00</span>
            </div>
          </div>
        </div>
      </Header>
      <Section>
        <h3 className="section-title">Destaques</h3>
        <div className="destaques-list">
          <ProdutoCard>
            <img src="listagem/image.png" alt="Combo Burguer Frango" />
            <span className="produto-nome">COMBO BURGUER FRANGO</span>
            <span className="produto-preco-antigo">R$ 29,90</span>
            <span className="produto-preco">R$ 24,90</span>
          </ProdutoCard>
          <ProdutoCard>
            <img src="listagem/image.png" alt="Combo Kids" />
            <span className="produto-nome">COMBO KIDS</span>
            <span className="produto-preco-antigo">R$ 49,90</span>
            <span className="produto-preco">R$ 45,40</span>
          </ProdutoCard>
          <ProdutoCard>
            <img src="listagem/image.png" alt="Potché Filézinho de Frango M" />
            <span className="produto-nome">Potché Filézinho de Frango M</span>
            <span className="produto-preco-antigo">R$ 74,90</span>
            <span className="produto-preco">R$ 71,90</span>
          </ProdutoCard>
          <ProdutoCard>
            <img src="listagem/image.png" alt="FNP Kids" />
            <span className="produto-nome">FNP Kids</span>
            <span className="produto-preco-antigo">R$ 39,50</span>
            <span className="produto-preco">R$ 37,52</span>
          </ProdutoCard>
          <ProdutoCard>
            <img src="listagem/image.png" alt="BURGUER BBQ" />
            <span className="produto-nome">BURGUER BBQ</span>
            <span className="produto-preco-antigo">R$ 15,90</span>
            <span className="produto-preco">R$ 14,90</span>
          </ProdutoCard>
        </div>
      </Section>
      <Section>
        <h3 className="section-title destaque">
          PROMOÇÃO DO DIA!{" "}
          <span role="img" aria-label="promo">
            %
          </span>
        </h3>
        <div className="promocoes-list">
          <PromocaoCard>
            <div className="info">
              <span className="nome">Potché Filézinho de Frango P</span>
              <span className="desc">
                O mais pedido dos casais! Nosso suculento filézinho de frango,
                acompanhado de batata frita...
              </span>
              <span className="preco-antigo">R$ 56,90</span>
              <span className="preco">R$ 55,76</span>
            </div>
            <img src="listagem/image.png" alt="Potché Filézinho de Frango P" />
          </PromocaoCard>
          <PromocaoCard>
            <div className="info">
              <span className="nome">BURGUER BBQ</span>
              <span className="desc">
                PÃO BRIOCHE SELADO NA MANTEIGA COM FRANGO EMPANADO E BARBECUE
                DEFUMADO.
              </span>
              <span className="preco-antigo">R$ 15,90</span>
              <span className="preco">R$ 14,90</span>
            </div>
            <img src="listagem/image.png" alt="BURGUER BBQ" />
          </PromocaoCard>
          <PromocaoCard>
            <div className="info">
              <span className="nome">COMBO BURGUER FRANGO</span>
              <span className="desc">
                COMBO COM BURGUER, BATATA FRITA E UMA BEBIDA 200ML
              </span>
              <span className="preco-antigo">R$ 29,90</span>
              <span className="preco">R$ 24,90</span>
            </div>
            <img src="listagem/image.png" alt="COMBO BURGUER FRANGO" />
          </PromocaoCard>
          <PromocaoCard>
            <div className="info">
              <span className="nome">COMBO KIDS</span>
              <span className="desc">
                Potché com filézinho de frango (sassami). Acompanha batata frita
                ou polenta frita....
              </span>
              <span className="preco-antigo">R$ 49,90</span>
              <span className="preco">R$ 45,40</span>
            </div>
            <img src="listagem/image.png" alt="COMBO KIDS" />
          </PromocaoCard>
          <PromocaoCard>
            <div className="info">
              <span className="nome">MINI CHURROS</span>
              <span className="desc">
                Mini Churros Recheado com 10 unidades. Este item vai com Canela
                e açúcar, caso não queira basta colocar no Campo...
              </span>
              <span className="preco">R$ 15,90</span>
            </div>
            <img src="listagem/image.png" alt="MINI CHURROS" />
          </PromocaoCard>
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
  background: #e53935;
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
        opacity: 0.8;
      }
      .pedido-min {
        color: #fff;
        opacity: 0.8;
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
    color: #222;
    margin-bottom: 18px;
    &.destaque {
      color: #e53935;
      font-size: 1.4rem;
      margin-top: 10px;
    }
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

const ProdutoCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 18px 16px 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  min-width: 160px;
  max-width: 170px;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 12px;
    background: #f5f5f5;
  }
  .produto-nome {
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #222;
    text-align: center;
  }
  .produto-preco-antigo {
    font-size: 0.9rem;
    color: #bdbdbd;
    text-decoration: line-through;
  }
  .produto-preco {
    font-size: 1.1rem;
    color: #e53935;
    font-weight: 700;
  }
`;

const PromocaoCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 18px 18px 24px;
  min-height: 110px;
  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    .nome {
      font-family: "Inter", sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: #222;
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
      color: #e53935;
      font-weight: 700;
    }
  }
  img {
    width: 90px;
    height: 90px;
    object-fit: contain;
    border-radius: 10px;
    margin-left: 18px;
    background: #f5f5f5;
  }
`;

export default Loja;
