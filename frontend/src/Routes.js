import React from "react";
import { Switch, Route } from "react-router-dom";

import ArticleList from "./Components/article/ArticleList";

export default () => (
  <Switch>
    {/* <Route path="/" component={} /> */}
    <Route exact path="/board" component={ArticleList} />
    <Route exact path="/board/:id" component={ArticleList} />
  </Switch>
);
