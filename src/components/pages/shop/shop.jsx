import React, { Component } from "react";
import "./shop.scss";
import CollectionsOverview from "../../collections-overview/collections-overview";
import { Route } from "react-router-dom";
import CollectionPage from "../collection-page/collection-page";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../../firebase/firebase.utils";
import { updateCollections } from "../../../redux/shop/shop.actions";
import { connect } from "react-redux";
import WithSpinner from "../../with-spinner/with-spinner";

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends Component {
  state = {
    isLoading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collections = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collections);
        this.setState({ isLoading: false });
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  render() {
    const { match } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="shop">
        <Route
          exact
          path={`${match.path}/:routeName`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={isLoading} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            WithSpinner(CollectionsOverview)(props) 
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCollections: (collections) =>
      dispatch(updateCollections(collections)),
  };
};

export default connect(null, mapDispatchToProps)(Shop);
