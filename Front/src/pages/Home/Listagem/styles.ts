import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;

    .card {
      display: flex;
      flex-direction: column;
      cursor: pointer;

      img {
        width: 15vw;
      }

      .cardTitle {
        font-family: 'Inter', sans-serif;
        font-size: 1.5rem;
        color: #9E6C00;
        font-weight: 600;
      }
    }
  }
`;