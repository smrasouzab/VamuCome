import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-color);
  gap: 60px;
  padding: 35px;
`;

export const Title = styled.div`
  width: 80%;
  display: flex;	
  flex-direction: column;

  .title1 {
    font-family: 'Inter', sans-serif;
    font-size: 3rem;
    font-weight: 400;
    color: #9E9090;
  }

  .title2 {
    font-family: 'Inter', sans-serif;
    font-size: 3.5rem;
    font-weight: 800;
    color: #9E6C00;
  }

  @media screen and (max-width: 480px) {
    .title1 {
      font-size: 2rem;
    }

    .title2 {
      font-size: 2.2rem;
    }
  }
`;

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
`;

export const StyledNavLink = styled(NavLink)`
  width: 100%;
  text-decoration: none;
  color: #000;
  background-color:rgb(0, 204, 255);
  font-size: 1.2rem;
  padding: 20px;
  border-radius: 30px;

  &:hover {
    background-color: #00aaff;
  }
`;

export const Categorias = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;

  img {
    width: 15vw;
    cursor: pointer;
    border-radius: 48px;
    transition: all 0.2s ease;

    &:hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
`;

export const ListaCategorias = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Inter', sans-serif;
    font-size: 2.2rem;
    font-weight: 400;

    .btnMin {
      all: unset;
      background: transparent;
      border: 1px solid #000;
      border-radius: 6px; 
      padding: 8px 12px;
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 0.9rem;
      cursor: pointer;

      &:hover {
        background-color:rgba(0, 0, 0, 0.05);
      }
    }
  }

  .categorias {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .cardy {
      display: flex;
      flex-direction: column;
      width: 15vw;
      gap: 15px;

      .text {
        display: flex;
        flex-direction: column;
        gap: 5px;

        .nome {
          font-family: 'Inter', sans-serif;
          font-size: 1.4rem;
          font-weight: 400;
        }

        .restaurantes {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #9E9090;
        }
      }
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

    .cardy {
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
        width: 100%;
        z-index: 0;
      }

      .informacoes {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .nome {
          font-family: 'Inter', sans-serif;
          font-size: 1.4rem;
          color: var(--color);
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
      }
    }

    .cardy.fechado {
      .labelFechado {
        display: flex;
      }

      .fotoFornecedor {
        filter: grayscale(100%);
      }
    }
  }
`;