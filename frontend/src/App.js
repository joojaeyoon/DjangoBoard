import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from "./Routes";

import Axios from "axios";
import styled from "styled-components";

import csrftoken from "./csrf_token";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function App() {
  Axios.defaults.headers = {
    "X-CSRFTOKEN": csrftoken
  };
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
