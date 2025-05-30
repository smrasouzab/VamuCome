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
  display: flex;
  flex-direction: row;
  width: 80%;

  h1 {
    font-family: "Inter", sans-serif;
    font-size: 4rem;
    font-weight: 700;
    color: var(--text-color);
  }
`;

export const Form = styled.form`
  display: grid;
  flex-direction: row;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: min-content 1fr;

  gap: 40px;

  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(200, 200, 200);
  border-radius: 32px;
  padding: 40px 60px;

  .coluna {
    display: flex;
    flex-direction: column;
    gap: 10px;

    span {
      font-family: "Inter", sans-serif;
      font-size: 1.2rem;
      color: var(--text-color);
      font-weight: 500;
    }

    .title {
      font-family: "Inter", sans-serif;
      font-size: 2.5rem;
      color: var(--text-color);
      font-weight: 700;
    }
  }

  .linha {
    display: flex;
    flex-direction: row;
    grid-column: span 2 / span 2;
    height: 45px;
  }
`;

export const ButtonSubmit = styled.button`
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

export const ContainerModal = styled.div`
  .coluna {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .linha {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
`;