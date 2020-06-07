import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/homepage/homepage";

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
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop/hats" component={Hats} />
      </Switch>
    </div>
  );
}

export default App;
