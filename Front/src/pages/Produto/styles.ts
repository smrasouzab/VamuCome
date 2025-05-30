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
    color: #000000;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 12px;

    &:hover {
      color: rgb(30, 30, 30);
    }
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
        color: #000000;
        font-weight: 700;
      }

      .preco {
        font-family: "Inter", sans-serif;
        font-size: 1.8rem;
        color: #e53935;
        font-weight: 700;
        margin-bottom: 16px;
      }

      .descricao {
        font-family: "Inter", sans-serif;
        font-size: 1.2rem;
        color: #555555;
        margin-bottom: 8px;
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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  .preco {
    font-family: "Inter", sans-serif;
    font-size: 1.8rem;
    color:rgb(0, 0, 0);
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
      color: #000000;
      font-weight: 500;
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
`;
