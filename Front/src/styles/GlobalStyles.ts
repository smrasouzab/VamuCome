import { createGlobalStyle } from 'styled-components';

const lightBgColor = "#fffaeb"; // Default theme color
const darkTBgColor = "#2b2b27"; // Dark theme color
const lightBgNavbarColor = "#f8d084"; // Light navbar background color
const darkBgNavbarColor = "#8b6f2f"; // Dark navbar background color
 
const GlobalStyle = createGlobalStyle<{ $themeColor: string; }>`
  :root {
    --bg-color: ${props => props.$themeColor === "light" ? lightBgColor : darkTBgColor};
    --bg-color-reverse: ${props => props.$themeColor !== "light" ? lightBgColor : darkTBgColor};
    --bg-navbar: ${props => props.$themeColor === "light" ? lightBgNavbarColor : darkBgNavbarColor};
    --color: ${props => props.$themeColor === "light" ? "#000" : "#fff"};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  html, body, #root {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;
 
export default GlobalStyle;