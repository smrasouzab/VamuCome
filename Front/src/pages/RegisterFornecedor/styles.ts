import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: var(--bg-color);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 32px;
  gap: 20px;
  padding: 40px 60px;

  .linha {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .coluna {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  h1 {
    font-family: 'Inter', sans-serif;
    font-size: 2.5rem;
    color: var(--color);
    font-weight: 700;
  }
`;

export const ButtonSubmit = styled.button`
  all: unset;
  height: 40px;
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFC13B;
  font-family: 'Inter', sans-serif;
  font-size: 1.4rem;
  color: #000000;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color:rgb(238, 180, 55);
  }
`;