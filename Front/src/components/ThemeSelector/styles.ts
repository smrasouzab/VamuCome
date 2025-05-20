import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 160px;
  padding: 0 12px;
  border: 2px solid var(--color);
  border-radius: 16px;

  .highlight {
    position: absolute;
    width: 36px;
    height: 36px;
    background-color: lightblue;
    border-radius: 8px;
    transition: all 0.5s ease;
    left: 9px;
    z-index: 0;

    &.pos1 {
      left: 9px;
    }

    &.pos2 {
      left: 45px;
    }

    &.pos3 {
      left: 81px;
    }
  }

  svg {
    color: var(--color);
    cursor: pointer;
    z-index: 1;
  }
`;