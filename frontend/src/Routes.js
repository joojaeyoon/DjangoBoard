import React from "react";
import { Switch, Route } from "react-router-dom";

import ArticleList from "./Components/article/ArticleList";
import Post from "./Components/post/post";

export default () => (
  <Switch>
    <Route exact path="/board" component={ArticleList} />
    <Route exact path="/board/:page" component={ArticleList} />
    <Route exact path="/board/search/:search" component={ArticleList} />
    <Route exact path="/board/search/:search/:page" component={ArticleList} />
    <Route exact path="/post" component={Post} />
  </Switch>
);
