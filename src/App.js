import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/homepage/homepage";
import Shop from "./components/pages/shop/shop";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./components/pages/sign-in-and-sign-up/sign-in-and-sign-up-page";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import setCurrentUser from "./redux/user/user.action";
import { connect } from "react-redux";
import CheckoutPage from "./components/pages/checkout/checkout-page";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);
        (await userRef).onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
      // addCollectionAndDocuments(
      //   "collections",
      //   collections.map(({ title, items }) => ({ title, items }))
      // );
    });
  }

  componentWillUnmount() {
    console.log("component unmounted");
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={Shop} />
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
          {/* <Route exact path="/shop/hats" component={Hats} />
          <Route exact path="/shop/jackets" component={Jackets} />
          <Route exact path="/shop/sneakers" component={Sneakers} />
          <Route exact path="/shop/womens" component={Womens} />
          <Route exact path="/shop/mens" component={Mens} /> */}
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collections: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
