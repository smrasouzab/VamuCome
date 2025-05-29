import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-color);
  gap: 60px;
  padding: 35px;
`;

export const Filtro = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .btnFiltro {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #F5EED7;
    padding: 15px;
    cursor: pointer;

    img {
      width: 45px;
      height: 45px;
    }
  }
`;

export const Listagem = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;

  .title {
    font-family: 'Inter', sans-serif;
    font-size: 2.5rem;
    color: #9E9090;
    font-weight: 400;
  }

  .lista {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5vw;
    margin-top: 20px;

    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      gap: 15px;
      margin-bottom: 35px;

      .labelFechado {
        right: 10px;
        top: 10px;
        position: absolute;
        display: none;
        padding: 5px 8px;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        color: #ffffff;
        background-color:rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        z-index: 1;
      }

      .fotoFornecedor {
        width: 15vw;
        z-index: 0;
      }

      .informacoes {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .nome {
          font-family: 'Inter', sans-serif;
          font-size: 1.4rem;
          color: #000000;
          font-weight: 400;
        }
        
        .tempoDistancia {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          .tempo {
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            color: #9F9F9F;
            font-weight: 700;
          }

          .distancia {
            padding: 5px 8px;
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            color: #ffffff;
            background-color: #C9A862;
            border-radius: 5px;
            font-weight: 400;
          }
        }

        .estrelas {
          display: flex;
          flex-direction: row;
          gap: 5px;

          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    .card.fechado {
      .labelFechado {
        display: flex;
      }

      .fotoFornecedor {
        filter: grayscale(100%);
      }
    }
  }
`;