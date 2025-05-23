import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  background-color: #FFFAEB;
  padding-top: 15vh;
  z-index: 100;
  gap: 60px;

  h1 {
    font-family: 'Inter', sans-serif;
    font-size: 3rem;
    color: #000000;
    font-weight: 300;
  }

  &.close {
    animation: fadeOut 0.6s ease forwards;
    pointer-events: none;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 150px;
  width: 35%;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    background-color: #ffffff;
    border-radius: 32px 0 0 32px;

    svg {
      transition: all 0.3s ease;
    }
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 50px;
    width: 100%;
    height: 100%;
    background-color: #FFC13B;

    h1, p {
      transition: all 0.3s ease;
    }
  }

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFC13B;
    height: 100%;
    width: 100px;
    border-radius: 0 32px 32px 0; 

    svg {
      transition: all 0.3s ease;
    }
  }

  &:hover {
    cursor: pointer;

    .icon {
      svg {
        transform: scale(1.1);
      }
    }

    .content {
      h1, p {
        transform: scale(1.05);
      }

      svg {
        transform: scale(1.1);
      }
    }

    .arrow {
      svg {
        transform: scale(1.2);
      }
    }
  }
`;