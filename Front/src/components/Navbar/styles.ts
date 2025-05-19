import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavbarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 35px;
  background-color: #F8D084;

  img {
    height: 85px;
    cursor: pointer;
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
`;