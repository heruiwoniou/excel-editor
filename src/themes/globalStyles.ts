import { createGlobalStyle, css} from "styled-components";

const defualtStyle = () => css`
    html,body{
        overflow: hidden;
    }
`
export const GlobalStyle = createGlobalStyle`
    ${defualtStyle()}
`