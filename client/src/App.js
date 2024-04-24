import React from "react";
//Design
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import Auth from "./components/auth/Auth";
import Navbar from "./components/layouts/Navbar";
import Admin from "./components/admin/Admin";
import Anonymous from "./components/anonymous/Anonymous";

const App = () => {
  return (
    <Provider store={store}>
      <div className=" position-relative h-100">
        <Router>
          <Navbar />
          <Switch>
            {/* Admin */}
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/users" component={Admin} />
            <Route exact path="/admin/user/add" component={Admin} />
            <Route exact path="/admin/user/edit" component={Admin} />
            <Route exact path="/admin/user/report" component={Admin} />
            <Route exact path="/admin/user/userId=:userId" component={Admin} />

            {/* Frontend Auth */}
            <Route exact path="/" component={Auth} />
            <Route exact path="/account" component={Auth} />
            <Route exact path="/account/forgot" component={Auth} />
            <Route exact path="/account/reset/:token" component={Auth} />

            {/* Dashboard */}
            <Route exact path="/admin/dashboard" component={Admin} />

            {/* Reception */}
            <Route exact path="/admin/reception" component={Admin} />

            {/* Song */}
            <Route exact path="/admin/song" component={Admin} />
            <Route
              exact
              path="/admin/song/edit"
              component={Admin}
            />
             <Route exact path="/admin/song/add" component={Admin} />

            {/* Book */}
            <Route exact path="/admin/book" component={Admin} />
            <Route
              exact
              path="/admin/book/edit"
              component={Admin}
            />
             <Route exact path="/admin/book/add" component={Admin} />

            {/* Joke */}
            <Route exact path="/admin/joke" component={Admin} />
            <Route
              exact
              path="/admin/joke/edit"
              component={Admin}
            />
             <Route exact path="/admin/joke/add" component={Admin} />

            {/* Trivia */}
            <Route exact path="/admin/trivia" component={Admin} />
            <Route
              exact
              path="/admin/trivia/edit"
              component={Admin}
            />
             <Route exact path="/admin/trivia/add" component={Admin} />

            {/* Setting */}
            <Route exact path="/admin/setting" component={Admin} />

            {/* Public Form */}
            <Route exact path="/anonymousform" component={Anonymous} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
