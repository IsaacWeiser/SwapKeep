import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { NewItemForm } from "./AddItem";
import { CurrentUserItems } from "./ShowUserItems";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/item/new">
          {isLoggedIn ? <NewItemForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/item/myItems">
          {isLoggedIn ? <CurrentUserItems /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </main>
  );
}
