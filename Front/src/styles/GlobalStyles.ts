import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle<{ $themeColor?: string; }>`
  :root {
    --background-color: ${props => props.$themeColor || "#ffffff"};;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }
`;
 
export default GlobalStyle;