/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from "react-router-dom"
import BookingPage from "./BookingPage"
import LoginPage from "./LoginPage"


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const onLogin = () => {
    setLoggedIn(true);
    console.log(loggedIn);
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage onLogin={onLogin}/>
        </Route>
        <Route path="/">
          { loggedIn ? <BookingPage /> : <Redirect to="/login" /> }
        </Route>
      </Switch>
    </Router>
  )
}
export default App;
