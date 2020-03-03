import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Axios from "axios";

import { renderTimestamp } from "./Article";

const ArticleDetail = ({ article_id, PanelRef }) => {
  const [data, setData] = useState({
    author: null,
    comments: [],
    created_at: "0000-00-00T00:00:00.000000Z",
    id: null,
    text: "",
    title: null
  });
  const [refresh, setRefresh] = useState(0);

  const text = data.text.split("\n").map((line, idx) => {
    return (
      <span key={idx}>
        {line}
        <br />
      </span>
    );
  });

  const comments = data.comments.map(c => (
    <div key={c.id}>
      <span>
        {c.author + " : "}
        {c.text}
      </span>
      <span>{renderTimestamp(c.created_at)}</span>
    </div>
  ));

  const handleExit = e => {
    PanelRef.current.style.visibility = "hidden";
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { username, text } = e.target;

    if (username.value === "" || text.value === "") return;

    Axios.post(`http://localhost:8000/api/articles/${article_id}/comment/`, {
      author: username.value,
      text: text.value
    }).then(res => {
      setRefresh(refresh + 1);
    });

    username.value = "";
    text.value = "";
  };

  useEffect(() => {
    if (article_id !== null) {
      PanelRef.current.style.transform = "translateX(0%)";
      Axios.get(`http://localhost:8000/api/articles/${article_id}`).then(
        res => {
          console.log(res.data);
          setData(res.data);
        }
      );
    }
  }, [article_id, refresh]);

  return (
    <DetailDiv ref={PanelRef}>
      <div className="Exit">
        <button onClick={handleExit}>X</button>
      </div>
      <div className="title">{data.title}</div>
      <div className="info">
        <span>{data.author}</span> <span>{data.created_at.slice(0, 19)}</span>
      </div>
      <div className="text">{text}</div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="text" placeholder="write comment..." />
        <input type="submit" name="submit" value="Submit" />
      </form>
      <div className="comment">{comments}</div>
    </DetailDiv>
  );
};

const DetailDiv = styled.div`
  border-radius: 30px;
  border: solid 1px #333;
  width: 80%;
  height: 80%;
  position: fixed;
  background-color: white;
  text-indent: 30px;
  font-size: 24px;
  visibility: hidden;

  > .Exit {
    text-align: right;
    > button {
      background: transparent;
      border: none;
      font-size: 24px;
      font-weight: bold;
      margin: 10px;
      cursor: pointer;
    }
  }

  > .title {
    border-bottom: solid 1px black;
    text-align: left;
  }

  > .info {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px black;
  }

  > .text {
    text-indent: 0px;
    padding: 30px;
    min-height: 50%;
    background: #ecf0f1;
    text-align: left;
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
      border-bottom: solid 1px #333;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
    }
  }
`;

export default ArticleDetail;
