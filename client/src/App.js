import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Base from "./components/Base";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Base />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
