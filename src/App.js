import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/homepage/homepage";
import Shop from "./components/pages/shop/shop";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./components/pages/signinandsignuppage/SignInAndSignUpPage";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import setCurrentUser from "./redux/user/user.action";
import { connect } from "react-redux";
import Hats from "./components/pages/hats/hats";
import Jackets from "./components/pages/jackets/jackets";
import Sneakers from "./components/pages/sneakers/sneakers";
import Womens from "./components/pages/womens/womens";
import Mens from "./components/pages/mens/mens";
import CheckoutPage from "./components/pages/checkout/checkout-page";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);
        (await userRef).onSnapshot((snapShot) => {
          this.props.setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        this.props.setCurrentUser(userAuth);
      }
      // createUserProfileDocument(user);
      // this.setState({ currentUser: user });
      // user ? this.props.history.push("/") : this.props.history.push("/signin");
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={Shop} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route exact path="/shop/hats" component={Hats} />
          <Route exact path="/shop/jackets" component={Jackets} />
          <Route exact path="/shop/sneakers" component={Sneakers} />
          <Route exact path="/shop/womens" component={Womens} />
          <Route exact path="/shop/mens" component={Mens} />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
