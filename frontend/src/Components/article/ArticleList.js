import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";

import Article from "./Article";
import { useHistory, useParams } from "react-router-dom";

import { renderTimestamp } from "./Article";

import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

const ArticleList = () => {
  const [data, setData] = useState({
    count: null,
    next: null,
    previous: null,
    results: []
  });
  const [article, setArticle] = useState({
    author: null,
    comments: [],
    created_at: "0000-00-00T00:00:00.000000Z",
    id: null,
    text: "",
    title: null
  });
  const [articleId, setArticleId] = useState(null);
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    Axios.get(`/api/articles/`, {
      params: {
        page: params.page,
        search: params.search
      }
    }).then(res => {
      setData(res.data);
    });
  }, [params]);

  useEffect(() => {
    if (articleId === null) return;
    Axios.get(`/api/articles/${articleId}/`).then(res => {
      setArticle(res.data);
    });
  }, [articleId, refresh]);

  const handleSubmit = e => {
    e.preventDefault();
    const { username, text } = e.target;

    if (username.value === "" || text.value === "") return;

    Axios.post(`/api/articles/${articleId}/comment/`, {
      author: username.value,
      text: text.value
    });

    username.value = "";
    text.value = "";
    setRefresh(refresh + 1);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleSearch = e => {
    e.preventDefault();
    const searchText = e.target.search.value;

    if (searchText === "") return;

    history.push(`/board/search/${searchText}`);
  };

  const articles = data.results.map(d => (
    <Article
      key={d.id}
      data={d}
      onClick={() => {
        setModal(true);
        setArticleId(d.id);
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

  const text = article.text.split("\n").map((line, idx) => {
    return (
      <span key={idx}>
        {line}
        <br />
      </span>
    );
  });

  const comments = article.comments.map(c => (
    <div key={c.id}>
      <span>
        {c.author + " : "}
        {c.text}
      </span>
      <span>{renderTimestamp(c.created_at)}</span>
    </div>
  ));

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
      <MDBContainer>
        <MDBModal
          isOpen={modal}
          toggle={toggle}
          size="lg"
          fullHeight
          position="right"
        >
          <MDBModalHeader toggle={toggle} style={{ textAlign: "left" }}>
            <div>{article.title}</div>
            <div>
              <span>{article.author}</span>{" "}
              <span>{article.created_at.slice(0, 19)}</span>
            </div>
          </MDBModalHeader>
          <MDBModalBody style={{ textAlign: "left" }}>
            <DetailDiv>
              <div className="text">{text}</div>
              <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" />
                <input type="text" name="text" placeholder="write comment..." />
                <input type="submit" name="submit" value="Submit" />
              </form>
              <div className="comment">{comments}</div>
            </DetailDiv>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggle}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
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

const DetailDiv = styled.div`
  background-color: white;
  font-size: 24px;

  > .info {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #686868;
  }

  > .text {
    text-indent: 0px;
    padding: 30px;
    max-height: 50%;
  }

  > form input {
    background: #e6e6e6;
    height: 30px;
    font-size: 18px;
    line-height: 1.2;
    color: #686868;
    background: #e6e6e6;
    border-radius: 5px;
    margin: 10px;
  }

  > form input[name="username"] {
    width: 100px;
  }

  > form input[name="text"] {
    width: 500px;
  }

  > form input[type="submit"] {
    height: 40px;
    width: 80px;
    background-color: #3498db;
    color: white;
    border-radius: 10px;
  }

  > .comment {
    text-align: left;

    > div {
      margin-top: 30px;
      border-bottom: solid 1px #333;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
`;

export default ArticleList;
