import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-color);
  gap: 60px;
  padding: 35px;
`;

export const Header = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .btnVoltar {
    all: unset;
    cursor: pointer;
    font-family: "Inter", sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--color);
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .informacoesProduto {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;

    img {
      width: 300px;
      height: 300px;
      border-radius: 16px;
      object-fit: cover;
    }

    .informacoes {
      display: flex;
      flex-direction: column;
      max-width: 50vw;

      .title {
        font-family: "Inter", sans-serif;
        font-size: 2.5rem;
        color: var(--color);
        font-weight: 700;
      }

      .preco {
        font-family: "Inter", sans-serif;
        font-size: 1.8rem;
        color: var(--bg-navbar);
        font-weight: 700;
        margin-bottom: 16px;
      }

      .descricao {
        font-family: "Inter", sans-serif;
        font-size: 1.2rem;
        color: var(--color);
        margin-bottom: 8px;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .informacoesProduto {
      flex-direction: column;
      align-items: center;

      img {
        width: 200px;
        height: auto;
      }

      .informacoes {
        max-width: 100%;
        text-align: center;

        .title {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .preco {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0px;
        }

        .descricao {
          font-size: 0.8rem;
          margin-bottom: 0px;
        }
      }
    }
  }
`;

export const AddCarrinho = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 25px;
  background-color: var(--bg-color);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  .preco {
    font-family: "Inter", sans-serif;
    font-size: 1.8rem;
    color: var(--color);
    font-weight: 700;
  }

  .quantidade {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    button {
      all: unset;
      cursor: pointer;
      padding: 5px;
      border-radius: 50%;

      &:hover {
        background-color: rgb(0, 0, 0, 0.05);
      }
    }

    span {
      font-family: "Inter", sans-serif;
      font-size: 1.6rem;
      color: var(--color);
      font-weight: 500;
    }

    svg {
      color: var(--color);
    }
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
    position: static;
    bottom: 0px;
    left: none;
    transform: none;
    flex-direction: column;
    align-items: center;
    gap: 0px;

    .quantidade {
      position: static;
      transform: none;
      margin-bottom: 10px;
    }

    .preco {
      font-size: 1.2rem;
    }
  }
`;

export const Button = styled.button`
  all: unset;
  height: 45px;
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc13b;
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  color: #000000;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: rgb(238, 180, 55);
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    font-size: 0.8rem;
  }
`;
