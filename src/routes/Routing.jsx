import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../containers/Layout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DetailBook from "../pages/DetailBook";
import Authors from "../pages/Authors";
import AddAuthor from "../pages/AddAuthor";
import UpdateAuthor from "../pages/UpdateAuthor";
import AddGenre from "../pages/AddGenre";
import UpdateGenre from "../pages/UpdateGenre";
import Genres from "../pages/Genres";
import History from "../pages/History";

class Routing extends Component {
  render() {
    return (
      <>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/book/:id" component={DetailBook} />
          <Route exact path="/genre" component={Genres} />
          <Route exact path="/genre/edit/:id" component={UpdateGenre} />
          <Route exact path="/genre/create" component={AddGenre} />
          <Route exact path="/history" component={History} />
          <Route exact path="/author" component={Authors} />
          <Route exact path="/author/edit/:id" component={UpdateAuthor} />
          <Route exact path="/author/create" component={AddAuthor} />
        </Router>
      </>
    );
  }
}
export default Routing;
