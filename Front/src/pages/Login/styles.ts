import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #FFFAEB;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 32px;
  gap: 20px;
  padding: 80px 60px;

  h1 {
    font-family: 'Inter', sans-serif;
    font-size: 2.5rem;
    color: #000000;
    font-weight: 700;
  }
  
  .esqueceuSenha {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    color:rgb(150, 150, 150);
    cursor: pointer;
  }

  .naoPossuiConta {
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: #000000;

    .amarelo {
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