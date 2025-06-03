import styled from "styled-components";

export const ContainerModal = styled.div`
  width: 100%;

  .coluna {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .active {
      color: var(--bg-navbar);
    }

    .activePreview:not(.active) {
      color: var(--bg-navbar);
    }

    svg {
      cursor: pointer;
    }
  }
  
  .linha {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
`;