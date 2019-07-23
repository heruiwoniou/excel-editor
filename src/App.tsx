import React from "react";
import styled from "styled-components";
import VirtualBox from "./VirtualBox";

const App: React.FC = () => {
  return (
    <AppContainer>
      <VirtualBox />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;
