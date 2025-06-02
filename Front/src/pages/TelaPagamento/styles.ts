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

export const Grid = styled.div`
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-rows: min-content;
  align-content: stretch;
  gap: 32px;

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
`;

export const FormasPagamento = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 32px;
  gap: 20px;
  padding: 30px 40px;

  button {
    all: unset;
    cursor: pointer;
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color);
    background-color: rgb(0, 0, 0, 0.05);
    border: 1px solid var(--border-color);
    padding: 10px 20px;
    border-radius: 8px;
  }
`;

export const DadosPagamento = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 32px;
  gap: 20px;
  padding: 40px 60px;

  grid-column-start: 1;
  grid-row-start: 2;

  @media screen and (max-width: 1280px) {
    grid-column-start: auto;
    grid-row-start: auto;
  }
`;

export const DetalhesPedido = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 32px;
  gap: 20px;
  padding: 40px 60px;

  grid-row: span 2 / span 2;
  grid-column-start: 2;
  grid-row-start: 1;

  @media screen and (max-width: 1280px) {
    grid-row: auto;
    grid-column-start: auto;
    grid-row-start: auto;
  }

  .title {
    font-family: "Inter", sans-serif;
    font-size: 2rem;
    color: var(--color);
    font-weight: 700;
  }

  .bold {
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--color);
  }

  .informacoes {
    display: flex;
    flex-direction: column;

    span {
      display: flex;
      justify-content: space-between;
      font-family: "Inter", sans-serif;
      font-size: 1rem;
      color: var(--color);
      font-weight: 400;
    }
  }

  .itens {
    display: flex;
    flex-direction: column;
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    gap: 10px;
    padding: 15px 20px;

    .item {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background-color: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 10px 20px;

      .btnRemover {
        all: unset;
        position: absolute !important;
        right: -5px;
        top: -5px;
        height: 10px;
        width: 10px;
        display: flex;
        cursor: pointer;
        font-size: 1rem;
        color: #ffffff;
        background-color: #e53935;
        border-radius: 50%;
        padding: 5px;

        &:hover {
          background-color: rgb(200, 0, 0);
        }
      }

      .fotoNome {
        img {
          height: 40px;
          width: 40px;
          border-radius: 50%;
        }

        span {
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          color: var(--color);
          font-weight: 500;
          margin-left: 10px;
        }
      }

      .quantidade {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;

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
          font-size: 1.2rem;
          color: var(--color);
          font-weight: 500;
        }

        svg {
          color: var(--color);
        }
      }
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

  &.confirmar {
    position: absolute;
    bottom: 32px;
    right: 32px;

    @media screen and (max-width: 1280px) {
      position: static;
    }
  }

  &.icon {
    gap: 10px;
  }
`;

export const Nenhum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .title {
    font-family: "Inter", sans-serif;
    font-size: 2rem;
    color: var(--color);
    font-weight: 700;
  }
`;

export const Pix = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .bold {
    font-weight: 700;
    font-size: 1.6rem;
  }

  .title {
    font-family: "Inter", sans-serif;
    font-size: 2rem;
    color: var(--color);
    font-weight: 700;
  }

  span {
    font-family: "Inter", sans-serif;
    font-size: 1.4rem;
    color: var(--color);
    font-weight: 400;
  }

  .qrcode {
    width: 200px;
    height: 200px;
    background-color: #ffffff;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
  }
`;

export const Cartao = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 8px;

    .div1 {
      grid-column: span 2 / span 2;
    }

    .div2 {
      grid-column: span 2 / span 2;
      grid-row-start: 2;
    }

    .div3 {
      grid-row-start: 3;
    }

    .div4 {
      grid-row-start: 3;
    }
  }

  .bold {
    font-weight: 700;
    font-size: 1.6rem;
  }

  .title {
    font-family: "Inter", sans-serif;
    font-size: 2rem;
    color: var(--color);
    font-weight: 700;
  }
`;
