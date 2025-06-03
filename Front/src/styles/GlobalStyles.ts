import { createGlobalStyle } from 'styled-components';

const lightBgColor = "#fffaeb"; // Default theme color
const darkTBgColor = "#2b2b27"; // Dark theme color
const lightBgNavbarColor = "#ffc13b"; // Light navbar background color
const darkBgNavbarColor = "#8b6f2f"; // Dark navbar background color
 
const GlobalStyle = createGlobalStyle<{ $themeColor: string; }>`
  :root {
    --bg-color: ${props => props.$themeColor === "light" ? lightBgColor : darkTBgColor};
    --bg-color-reverse: ${props => props.$themeColor !== "light" ? lightBgColor : darkTBgColor};
    --bg-navbar: ${props => props.$themeColor === "light" ? lightBgNavbarColor : darkBgNavbarColor};
    --color: ${props => props.$themeColor === "light" ? "#000" : "#fff"};
    --color-reverse: ${props => props.$themeColor === "light" ? "#fff" : "#000"};
    --border-color: ${props => props.$themeColor === "light" ? "#696969" : "#c8c8c8"};
    --bg-color-opacity: ${props => props.$themeColor === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(43, 43, 39, 0.8)"};
    --bg-color-opacity-reverse: ${props => props.$themeColor === "light" ? "rgba(43, 43, 39, 0.8)" : "rgba(255, 255, 255, 0.8)"};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif !important;
  }

  html, body, #root {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);
  }
`;
 
export default GlobalStyle;