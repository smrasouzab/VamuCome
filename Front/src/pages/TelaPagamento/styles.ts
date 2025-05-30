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

export const FormasPagamento = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(200, 200, 200);
  border-radius: 32px;
  gap: 20px;
  padding: 40px 60px;
`;