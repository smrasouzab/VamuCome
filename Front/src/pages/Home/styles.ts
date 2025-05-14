import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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