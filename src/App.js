import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/homepage/homepage";
import Shop from "./components/pages/shop/shop";
import Header from "./components/header/header";
import AuthPage from "./components/pages/authpage/authpage";
import { auth } from "./firebase/firebase.utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      // user ? this.props.history.push("/") : this.props.history.push("/signin");
      console.log(this.state.currentUser);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/signin" component={AuthPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
