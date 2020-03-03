import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Axios from "axios";

import Article from "./Article";
import ArticleDetail from "./ArticleDetail";
import { useHistory, useParams } from "react-router-dom";

const ArticleList = () => {
  const [data, setData] = useState({
    count: null,
    next: null,
    previous: null,
    results: []
  });
  const [articleId, setArticleId] = useState(null);

  const PanelRef = useRef();

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:8000/api/articles/`, {
      params: {
        page: params.id
      }
    }).then(res => {
      setData(res.data);
    });
  }, [params]);

  const articles = data.results.map(data => (
    <Article
      key={data.id}
      data={data}
      onClick={() => {
        PanelRef.current.style.visibility = "visible";
        setArticleId(data.id);
      }}
    />
  ));

  const totalPage = Math.floor(data.count / 15) + 1;

  const pages = [];

  for (var i = 0; i < totalPage; i++) {
    pages.push(
      <li
        key={i + 1}
        onClick={e => {
          history.push(`/board/${e.target.innerText}`);
        }}
      >
        {i + 1}
      </li>
    );
  }

  return (
    <ListDiv>
      <ListUl>{articles}</ListUl>
      <PagesUl>{pages}</PagesUl>
      <ArticleDetail PanelRef={PanelRef} article_id={articleId} />
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

    :hover {
      cursor: pointer;
      background-color: #34495e;
    }
  }
`;

export default ArticleList;
