import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-color);
  gap: 30px;
  padding: 35px;
`;

export const PedidoAtual = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  border: 1px solid rgb(200, 200, 200);
  
    .bold {
      font-weight: 700;
      font-size: 1.4rem;
    }

  .status {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 20px;
    background-color: rgb(230, 230, 230);
    border-radius: 16px 16px 0 0;

    span {
      font-family: "Inter", sans-serif;
      font-size: 1.5rem;
      color: var(--text-color);
      font-weight: 700;
    }
  }

  .pedido {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .numeroPedido {
      font-family: "Inter", sans-serif;
      font-size: 2rem;
      color: var(--text-color);
      font-weight: 700;
    }

    .informacoes {
      display: flex;
      flex-direction: column;

      .bold {
        font-weight: 700;
        font-size: 1.2rem;
      }

      span {
        display: flex;
        justify-content: space-between;
        font-family: "Inter", sans-serif;
        font-size: 1rem;
        color: var(--text-color);
        font-weight: 400;
      }
    }

    .itens {
      display: flex;
      flex-direction: column;
      background-color: rgb(245, 245, 245);
      border: 1px solid rgb(200, 200, 200);
      border-radius: 16px;
      gap: 10px;
      padding: 15px 20px;

      .item {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(200, 200, 200);
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
            color: var(--text-color);
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
            color: #000000;
            font-weight: 500;
          }
        }
      }
    }
  }
`;

export const Linha = styled.div`
  width: 80%;
  height: 1px;
  background-color: rgb(200, 200, 200);
`;

export const PedidosAnterior = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  border: 1px solid rgb(200, 200, 200);
  
  .bold {
    font-weight: 700;
    font-size: 1.4rem;
  }

  .pedido {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .numeroPedido {
      font-family: "Inter", sans-serif;
      font-size: 2rem;
      color: var(--text-color);
      font-weight: 700;
    }

    .informacoes {
      display: flex;
      flex-direction: column;

      .bold {
        font-weight: 700;
        font-size: 1.2rem;
      }

      span {
        display: flex;
        justify-content: space-between;
        font-family: "Inter", sans-serif;
        font-size: 1rem;
        color: var(--text-color);
        font-weight: 400;
      }
    }

    .itens {
      display: flex;
      flex-direction: column;
      background-color: rgb(245, 245, 245);
      border: 1px solid rgb(200, 200, 200);
      border-radius: 16px;
      gap: 10px;
      padding: 15px 20px;

      .item {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(200, 200, 200);
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
            color: var(--text-color);
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
            color: #000000;
            font-weight: 500;
          }
        }
      }
    }
  }
`;