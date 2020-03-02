import React from "react";
import styled from "styled-components";

const Article = () => {
  return (
    <ArticleLi>
      <div>제목</div>
      <div>
        <span>작성자</span>
        <span>시간</span>
      </div>
    </ArticleLi>
  );
};

const ArticleLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 30px;
  border: solid 1px #333;
  border-radius: 5px;
  height: 60px;
  width: 1000px;

  > * {
    display: flex;
    justify-content: space-between;
  }
`;

export default Article;
