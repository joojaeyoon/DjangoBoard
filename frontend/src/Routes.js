import React from "react";
import { Switch, Route } from "react-router-dom";

import ArticleList from "./Components/article/ArticleList";
import Post from "./Components/post/post";

export default () => (
  <Switch>
    {/* <Route path="/" component={} /> */}
    <Route exact path="/board" component={ArticleList} />
    <Route exact path="/board/:id" component={ArticleList} />
    <Route exact path="/post" component={Post} />
  </Switch>
);
