import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "./Routes";

import styled from "styled-components";

function App() {
  return (
    <Router>
      <Menubar>
        <a>DjangoBoard</a>
      </Menubar>
      <Route />
    </Router>
  );
}

const Menubar = styled.div`
  background-color: #333;
  height: 60px;
  text-align: left;
  color: white;
  align-items: center;
  display: flex;

  > * {
    margin: 30px;
    font-size: 24px;
    font-weight: bold;
  }
`;

export default App;
