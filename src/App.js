import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/homepage/homepage";
import Shop from "./components/pages/shop/shop";
import CollectionItem from "./components/collection-item/collection-item";
import Collection from "./components/collection-preview/collection-preview";
import Header from "./components/header/header";

const Hats = (props) => {
  console.log(props)
  return (
    <div>
      <h1>HATS</h1>
    </div>
  );
};

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop/hats" component={Hats} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/collection-item" component={CollectionItem} />
        <Route exact path="/collection" component={Collection} />
      </Switch>
    </div>
  );
}

export default App;
