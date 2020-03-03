import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "./Routes";

import styled from "styled-components";

function App() {
  return (
    <Router>
      <Menubar>
        <button>DjangoBoard</button>
      </Menubar>
      <Route />
    </Router>
  );
}

const Menubar = styled.div`
  background-color: #333;
  height: 60px;
  text-align: left;
  align-items: center;
  display: flex;

  > button {
    margin: 30px;
    font-size: 24px;
    font-weight: bold;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }
`;

export default App;
