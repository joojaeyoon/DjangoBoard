import React from "react";

import styled from "styled-components";

import ArticleList from "./Components/article/ArticleList";

function App() {
  return (
    <div>
      <Menubar>
        <a>DjangoBoard</a>
      </Menubar>

      <ArticleList />
    </div>
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
