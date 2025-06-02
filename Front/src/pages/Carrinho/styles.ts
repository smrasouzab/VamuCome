import styled from 'styled-components';

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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .title {
    font-family: "Inter", sans-serif;
    font-size: 3rem;
    color: var(--text-color);
    font-weight: 700;
  }
`;

export const Itens = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgb(200, 200, 200);
  border-radius: 16px;
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
    margin-bottom: 15px;

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
`;

export const Button = styled.button`
  all: unset;
  height: 40px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFC13B;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: #000000;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color:rgb(238, 180, 55);
  }
`;