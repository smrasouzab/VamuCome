import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 350px;
  height: 50px;
  border: 1px solid var(--border-color);
  border-radius: 99999px;
  background-color: var(--color-reverse);
  font-family: "Inter", sans-serif;
  color: var(--bordedr-color);
  padding: 0 20px;

  input {
    all: unset;
    width: 100%;
    height: 100%;
    color: var(--border-color);
  }

  svg {
    cursor: pointer;
    fill: var(--border-color);
  }
`;