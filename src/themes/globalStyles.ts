import { createGlobalStyle, css } from "styled-components";

const defualtStyle = () => css`
  html,
  body {
    overflow: hidden;
  }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
export const GlobalStyle = createGlobalStyle`
    ${defualtStyle()}
`;
