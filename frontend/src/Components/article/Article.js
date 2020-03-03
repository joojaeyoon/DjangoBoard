import React from "react";
import styled, { keyframes } from "styled-components";

const Article = ({ data }) => {
  const renderTimestamp = timestamp => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
      prefix = "just now...";
    } else if (timeDiff < 60 && timeDiff >= 1) {
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff >= 60) {
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff >= 24 * 60) {
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  return (
    <ArticleLi>
      <div>{data.title}</div>
      <div>
        <span>{data.author}</span>
        <span>{renderTimestamp(data.created_at)}</span>
      </div>
    </ArticleLi>
  );
};

const FadeIn = keyframes`
  0%{
    background-color:#f1c40f;
    transform:translateX(30%);
    opacity=0;
  }
  95%{
    transform:translateX(-1%);
  }
  100%{
    background-color:white;
    opacity=1;
  }
`;

const ArticleLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 30px;
  border: solid 1px #333;
  border-radius: 5px;
  height: 60px;
  width: 1000px;
  animation: ${FadeIn} 1s ease-out;

  :hover {
    cursor: pointer;
    background-color: #f39c12;
    transform: translate(1%);
  }

  > * {
    display: flex;
    justify-content: space-between;
  }
`;

export default Article;
