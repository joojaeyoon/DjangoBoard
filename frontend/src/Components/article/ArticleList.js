import React from "react";
import styled from "styled-components";

import Article from "./Article";

const ArticleList = () => {
  return (
    <ListDiv>
      <ListUl>
        <Article />
        <Article />
        <Article />
        <Article />
      </ListUl>
      <PagesUl>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </PagesUl>
    </ListDiv>
  );
};

const ListDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListUl = styled.ul`
  list-style: none;
`;

const PagesUl = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;

  > li {
    border: 1px solid #333;
    border-radius: 100px;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    font-size: 20px;
  }
`;

export default ArticleList;
