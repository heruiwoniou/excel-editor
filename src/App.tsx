import React from "react";
import styled from "styled-components";
import ExcelEditor from "./ExcelEditor";
import { GlobalStyle } from "./themes/GlobalStyles";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ExcelEditor />
      </AppContainer>
    </>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;
