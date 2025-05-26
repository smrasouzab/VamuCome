import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    font-family: "Inter", sans-serif;
    color:  #000000;
    margin-bottom: 5px;
    font-size: 0.8rem;
    font-weight: 700;
  }

  .borderInput {
    display: flex;
    padding: 0 8px;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 8px;
    transition: all 0.3s ease;

    input {
      all: unset;
      font-family: "Inter", sans-serif;
      color:  #000000;
      width: 160px;
      height: 40px;
    }

    &.focus {
      background-color:rgba(0, 0, 0, 0.03);
    }

    &.error {
      background-color:rgba(255, 0, 0, 0.1);
      border: 1px solid rgb(255, 0, 0);
    }

    &.success {
      background-color:rgba(0, 255, 0, 0.1);
      border: 1px solid rgb(0, 255, 0);
    }
  }
`;