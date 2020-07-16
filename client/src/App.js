import React, { Component, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";
import { checkUserSession } from "./redux/user/user.action";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import TransactionsHistoryPage from "./components/pages/transactions-history/transactions-history-page";
import SuccessPage from "./components/pages/success/success";
const HomePage = lazy(() => import("./components/pages/homepage/homepage"));
const Shop = lazy(() => import("./components/pages/shop/shop"));
const SignInAndSignUpPage = lazy(() =>
  import("./components/pages/sign-in-and-sign-up/sign-in-and-sign-up-page")
);
const CheckoutPage = lazy(() =>
  import("./components/pages/checkout/checkout-page")
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  // unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;

    checkUserSession();

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
    //   if (userAuth) {
    //     const userRef = createUserProfileDocument(userAuth);
    //     (await userRef).onSnapshot((snapShot) => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data(),
    //       });
    //     });
    //   } else {
    //     setCurrentUser(userAuth);
    //   }
    //   // addCollectionAndDocuments(
    //   //   "collections",
    //   //   collections.map(({ title, items }) => ({ title, items }))
    //   // );
    // });
  }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
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
              <Route exact path="/history" component={TransactionsHistoryPage} />
              <Route exact path="/checkout" component={CheckoutPage} />
              <Route exact path="/success" component={SuccessPage} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
