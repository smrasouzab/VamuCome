import styled from "styled-components";

export const Container = styled.div<{ $initialLeft: number }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 160px;
  padding: 0 12px;
  border: 2px solid var(--color);
  border-radius: 12px;

  .highlight {
    position: absolute;
    width: 36px;
    height: 36px;
    background-color: var(--color);
    border-radius: 8px;
    transition: all 0.5s ease;
    left: ${props => props.$initialLeft}px;
    z-index: 0;
    opacity: 0.1;

    &.pos1 {
      left: 9px;
    }

    &.pos2 {
      left: 59px;
    }

    &.pos3 {
      left: 110px;
    }
  }

  svg {
    color: var(--color);
    cursor: pointer;
    z-index: 1;
  }
`;