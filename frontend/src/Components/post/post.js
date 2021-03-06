import React from "react";
import styled from "styled-components";
import Axios from "axios";

import { useHistory } from "react-router-dom";
const Post = () => {
  const history = useHistory();
  const handlePost = e => {
    e.preventDefault();
    const { username, title, text } = e.target;

    if (username.value === "" || title === "" || text === "") {
      alert("다시 입력해주십시오.");
      return;
    }

    Axios.post("/api/articles/", {
      author: username.value,
      title: title.value,
      text: text.value
    }).then(res => {});
    history.push("/board");
  };

  return (
    <PostDiv>
      <Form onSubmit={handlePost}>
        <p>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="username"
          />
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="title"
          />
        </p>
        <p>
          <textarea
            type="text"
            name="text"
            placeholder="write text..."
            className="form-control"
            id="exampleFormControlTextarea1"
          />
        </p>
        <p>
          <input type="submit" name="submit" value="Post!" />
        </p>
      </Form>
    </PostDiv>
  );
};

const PostDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Form = styled.form`
  > p {
    > input,
    textarea {
      background: #e6e6e6;
      font-size: 18px;
      line-height: 1.2;
      color: #686868;
      border-radius: 5px;
      margin: 10px;
    }
    > input[name="username"] {
      width: 200px;
    }
    > input[name="title"] {
      width: 520px;
    }

    > textarea {
      width: 750px;
      height: 500px;
      resize: none;
    }

    > input[type="submit"] {
      width: 150px;
      height: 80px;
      font-size: 28px;
      font-weight: bold;
      background-color: #3498db;
      color: white;
    }
  }
`;

export default Post;
