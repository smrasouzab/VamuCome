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
  padding: 60px 60px;

  h1 {
    font-family: 'Inter', sans-serif;
    font-size: 2.5rem;
    color: var(--color);
    font-weight: 700;
  }

  .naoPossuiConta {
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: var(--color);

    .amarelo {
      all: unset;
      color:rgb(255, 174, 0);
      cursor: pointer;

      &:hover {
        color: rgb(231, 158, 0);
      }
    }
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