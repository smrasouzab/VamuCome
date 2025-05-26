import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-color);
  gap: 60px;
  padding: 35px;
`;

export const Title = styled.div`
  width: 80%;
  display: flex;	
  flex-direction: column;

  .title1 {
    font-family: 'Inter', sans-serif;
    font-size: 3rem;
    font-weight: 400;
    color: #9E9090;
  }

  .title2 {
    font-family: 'Inter', sans-serif;
    font-size: 3.5rem;
    font-weight: 800;
    color: #9E6C00;
  }
`;

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
`;

export const StyledNavLink = styled(NavLink)`
  width: 100%;
  text-decoration: none;
  color: #000;
  background-color:rgb(0, 204, 255);
  font-size: 1.2rem;
  padding: 20px;
  border-radius: 30px;

  &:hover {
    background-color: #00aaff;
  }
`;

export const Categorias = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;

  img {
    width: 15vw;
    cursor: pointer;
    border-radius: 48px;
    transition: all 0.2s ease;

    &:hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
`;

export const ListaCategorias = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Inter', sans-serif;
    font-size: 2.2rem;
    font-weight: 400;

    .btnMin {
      all: unset;
      background: transparent;
      border: 1px solid #000;
      border-radius: 6px; 
      padding: 8px 12px;
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 0.9rem;
      cursor: pointer;

      &:hover {
        background-color:rgba(0, 0, 0, 0.05);
      }
    }
  }

  .categorias {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .card {
      display: flex;
      flex-direction: column;
      width: 15vw;
      gap: 15px;

      .text {
        display: flex;
        flex-direction: column;
        gap: 5px;

        .nome {
          font-family: 'Inter', sans-serif;
          font-size: 1.4rem;
          font-weight: 400;
        }

        .restaurantes {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #9E9090;
        }
      }
    }
  }
`;