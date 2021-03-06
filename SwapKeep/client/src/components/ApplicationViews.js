import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { NewItemForm } from "./AddItem";
import { CurrentUserItems } from "./ShowUserItems";
import { ItemDetails } from "./ItemDetails";
import { ItemEdit } from "./EditItem";
import { ItemDeactivate } from "./DeactivateItem";
import { Feed } from "./Feed";
import { NavBar } from "./NavBar";
import { MakeOffer } from "./CreateOffer";
import { ViewTrades } from "./ViewTrades";
import { RescindTrade } from "./RescindTrade";
import { AcceptTrade } from "./AcceptTrade";
import { DeclineTrade } from "./DeclineTrade";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      {isLoggedIn ? <NavBar /> : ""}
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Feed /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/item/new">
          <NewItemForm />
        </Route>

        <Route path="/item/myItems">
          <CurrentUserItems />
        </Route>

        <Route path="/item/details/:id">
          <ItemDetails />
        </Route>

        <Route path="/item/edit/:id">
          <ItemEdit />
        </Route>

        <Route path="/item/offer/create/:id">
          <MakeOffer />
        </Route>

        <Route path="/item/deactivate/:id">
          <ItemDeactivate />
        </Route>

        <Route path="/offers" exact>
          <ViewTrades />
        </Route>

        <Route path="/offers/rescind/:id">
          <RescindTrade />
        </Route>

        <Route path="/offers/accept/:id">
          <AcceptTrade />
        </Route>

        <Route path="/offers/decline/:id">
          <DeclineTrade />
        </Route>
      </Switch>
    </main>
  );
}
