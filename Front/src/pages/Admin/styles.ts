import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
	height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bs-body-bg);
  gap: 10px;

  label {
    color: var(--color);
  }

  .btnVoltar {
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;