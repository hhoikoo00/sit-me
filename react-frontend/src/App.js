/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import BookingPage from "./components/bookingPage/BookingPage";
import LoginPage from "./components/loginPage/LoginPage";
import HomePage from "./components/homePage/HomePage";
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const onLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login/:dest?">
          <LoginPage onLogin={onLogin} />
        </Route>
        <Route path="/bookingPage">
          {loggedIn ? <BookingPage /> : <Redirect to="/login/bookingPage" />}
        </Route>
        <Route path="/">
          {loggedIn ? <HomePage /> : <Redirect to="/login/" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
