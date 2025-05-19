import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle<{ $themeColor: string; }>`
  :root {
    --theme-color: ${props => props.$themeColor};
    --theme-color-reverse: ${props => props.$themeColor === "#ffffff" ? "#000000" : "#ffffff"};
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