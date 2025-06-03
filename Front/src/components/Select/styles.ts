import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: min-content;

  .label {
    font-family: "Inter", sans-serif;
    color: var(--color);
    margin-bottom: 5px;
    margin-left: 2px;
    font-size: 0.8rem;
    font-weight: 700;
  }

  .errorLabel {
    font-family: "Inter", sans-serif;
    color:rgb(255, 0, 0);
    margin-top: 5px;
    font-size: 0.7rem;
    font-weight: 400;
  }

  .borderInput {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    transition: all 0.3s ease;

    select {
      all: unset;
      display: flex;
      align-items: center;
      font-family: "Inter", sans-serif;
      color: var(--color);
      width: 160px;
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.focus {
      background-color:rgba(0, 0, 0, 0.03);
    }

    &.error {
      background-color:rgba(255, 0, 0, 0.1);
      border: 1px solid rgb(255, 0, 0);
    }

    .hidePassword {
      all: unset;
    }
  }
`;