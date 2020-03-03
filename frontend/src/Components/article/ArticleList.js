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
        page: params.page,
        search: params.search
      }
    }).then(res => {
      setData(res.data);
    });
  }, [params]);

  const handleSearch = e => {
    e.preventDefault();
    const searchText = e.target.search.value;

    if (searchText === "") return;

    history.push(`/board/search/${searchText}`);
  };

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
          if (history.location.pathname.split("/")[2] === "search")
            history.push(
              `/board/search/${params.search}/${e.target.innerText}`
            );
          else history.push(`/board/${e.target.innerText}`);
        }}
      >
        {i + 1}
      </li>
    );
  }

  return (
    <ListDiv>
      <button
        onClick={() => {
          history.push("/post");
        }}
      >
        Post!
      </button>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search.." />
        <input type="submit" name="submit" value="Search" />
      </form>
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

  > button {
    width: 200px;
    height: 100px;
    border-radius: 30px;
    margin-top: 30px;
    font-size: 28px;
    font-weight: bold;
    color: white;
    background: #3498db;
    border: none;
    cursor: pointer;

    :hover {
      background: #2980b9;
    }
    :active {
      transform: translateY(3px);
    }
  }

  > form {
    margin-top: 30px;

    > input[type="text"] {
      width: 300px;
      height: 30px;
      border-radius: 5px;
      margin-right: 10px;
    }
    > input[type="submit"] {
      height: 40px;
      border-radius: 10px;
      border: none;
      background: #e74c3c;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
  }
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
