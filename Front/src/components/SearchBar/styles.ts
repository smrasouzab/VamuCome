import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 350px;
  height: 50px;
  border: 1px solid #696969;
  border-radius: 99999px;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  color:  #696969;
  padding: 0 20px;

  input {
    all: unset;
    width: 100%;
    height: 100%;
  }

  svg {
    cursor: pointer;
  }
`;