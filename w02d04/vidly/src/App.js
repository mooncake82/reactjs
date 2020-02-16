import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import MovieShow from "./components/movies/show";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import "./App.css";
import LoginForm from "./components/login/loginForm";
import Register from "./components/register/registerForm";
import MoviesIndex from "./components/movies";
import NewMovie from "./components/movies/new";
import MovieEdit from "./components/movies/edit";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/new" component={NewMovie} />
            <Route path="/movies/:id/edit" component={MovieEdit} />
            <Route path="/movies/:id" component={MovieShow} />
            <Route path="/movies" component={MoviesIndex} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
