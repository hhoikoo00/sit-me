/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import AreaStatusPage from "./views/AreaStatusPage";
import EnterCodePage from "./views/EnterCodePage";
import BookSeatPage from "./views/BookSeatPage";
import SeatStatusPage from "./views/SeatStatusPage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const onLogin = (userId) => {
    setLoggedIn(true);
    setUser(userId);
  };

  // TODO refactror redirect component

  return (
    <Router>
      <Switch>
        <Route path="/login/:dest?/:param?">
          <LoginPage onLogin={onLogin} />
        </Route>

        <Route path="/entercode">
          {loggedIn ? <EnterCodePage /> : <Redirect to="/login/entercode" />}
        </Route>

        {loggedIn ? (
          <Route path="/bookSeat/:seatCode">
            <BookSeatPage user={user} />
          </Route>
        ) : (
          <Redirect from="/bookSeat/:seatCode" to="/login/bookSeat/:seatCode" />
        )}

        {loggedIn ? (
          <Route path="/seatStatus/:seatCode">
            <SeatStatusPage user={user} />
          </Route>
        ) : (
          <Redirect
            from="/seatStatus/:seatCode"
            to="/login/seatStatus/:seatCode"
          />
        )}

        {loggedIn ? (
          <Route path="/area/:id">
            <AreaStatusPage />
          </Route>
        ) : (
          <Redirect from="/area/:id" to="/login/area/:id" />
        )}

        <Route path="/">
          {loggedIn ? <HomePage user={user} /> : <Redirect to="/login/" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
