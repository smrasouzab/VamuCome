import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavbarContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 35px;
  background-color: var(--bg-navbar);
  z-index: 1000;

  img {
    height: 45px;
    cursor: pointer;
  }

  .user {
    position: relative;

    .userBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border: 2px solid var(--color);
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        background-color: var(--color);
        transition: all 0.3s ease;

        svg {
          color: var(--bg-color);
        }
      }
    }

    .card {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 8px;
      width: 250px;
      height: 300px;
      border-radius: 12px;
      background-color: var(--bg-color);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      cursor: default;
    }

    .cardDeslogado {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      top: 100%;
      right: 0;
      margin-top: 8px;
      padding: 20px;
      border-radius: 12px;
      background-color: var(--bg-color);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      cursor: default;

      span {
        white-space: nowrap;
        font-family: "Inter", sans-serif;
      }

      .amarelo {
        all: unset;
        color:rgb(255, 174, 0);
        font-weight: 700;
        cursor: pointer;

        &:hover {
          color: rgb(231, 158, 0);
        }
      }
    }
  }
`;

export const NavbarNavlinkContainer = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 60px;
`;

export const NavbarNavlink = styled(NavLink)`
  text-decoration: none;
  color: #000;
  font-family: "Jua", sans-serif;
  font-size: 1.8rem;
  color: var(--color);
`;