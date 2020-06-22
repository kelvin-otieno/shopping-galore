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

class Shop extends Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collections = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collections);
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop">
        <Route
          exact
          path={`${match.path}/:routeName`}
          component={CollectionPage}
        />
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
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
