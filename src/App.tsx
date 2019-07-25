import React from "react";
import styled from "styled-components";
import VirtualBox from "./VirtualBox";
import { GlobalStyle } from "./themes/globalStyles";
import { DataProvider } from "./store";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <DataProvider>
          <VirtualBox />
        </DataProvider>
      </AppContainer>
    </>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;
