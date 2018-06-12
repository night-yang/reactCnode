import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./Main";
import ShowTopic from "./ShowTopic";
import User from "./User";
import TopicCreate from "./TopicCreate";
import Error from "./Error";
class Section extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/topic/create" component={TopicCreate} />
        <Route path="/topic/:id" component={ShowTopic} />
        <Route path="/user/:username" component={User} />
        <Route path="/404" component={Error} />
        <Redirect from="*" to="/404" />
      </Switch>
    );
  }
}

export default Section;
