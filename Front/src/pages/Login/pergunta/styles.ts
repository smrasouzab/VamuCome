import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-color);
  padding-top: 15vh;
  z-index: 100;
  gap: 60px;

  h1 {
    font-family: "Inter", sans-serif;
    font-size: 3rem;
    color: var(--color);
    font-weight: 300;
  }

  @media screen and (max-width: 1280px) {
    h1 {
      font-size: 2rem;
    }
  }

  @media screen and (max-width: 480px) {
    h1 {
      font-size: 1.5rem;
    }
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

  @media screen and (max-width: 1280px) {
    h1 {
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 480px) {
    h1 {
      font-size: 1.2rem;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 150px;
    background-color: var(--bg-color);
    border-radius: 32px 0 0 32px;
    border: 3px solid var(--bg-navbar);

    svg {
      color: var(--color);
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
    background-color: var(--bg-navbar);

    h1,
    p {
      transition: all 0.3s ease;
    }
  }

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-navbar);
    height: 100%;
    width: 100px;
    border-radius: 0 32px 32px 0;

    svg {
      color: var(--color);
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
      h1,
      p {
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
