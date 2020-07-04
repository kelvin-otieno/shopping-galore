import React, { Component } from "react";
import "./shop.scss";
import CollectionsOverview from "../../collections-overview/collections-overview";
import { Route } from "react-router-dom";
import CollectionPage from "../collection-page/collection-page";

import { fetchCollections } from "../../../redux/shop/shop.actions";
import { connect } from "react-redux";
import WithSpinner from "../../with-spinner/with-spinner";
import { selectIsCollectionLoaded } from "../../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  render() {
    const { match, selectIsCollectionLoaded } = this.props;
    return (
      <div className="shop">
        <Route
          exact
          path={`${match.path}/:routeName`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!selectIsCollectionLoaded}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner
              isLoading={!selectIsCollectionLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectIsCollectionLoaded: selectIsCollectionLoaded,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollections: () => dispatch(fetchCollections()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
