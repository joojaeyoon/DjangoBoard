import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from "./Routes";

import styled from "styled-components";

function App() {
  return (
    <Router>
      <Menubar>
        <Link to="/board">DjangoBoard</Link>
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

  > a {
    text-decoration: none;
    margin: 30px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    cursor: pointer;

    :active {
      transform: translateY(3px);
    }
  }
`;

export default App;
