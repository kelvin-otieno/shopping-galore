import React, { Component } from "react";
import "./shop.scss";
import { Route } from "react-router-dom";
import { fetchCollections } from "../../../redux/shop/shop.actions";
import { connect } from "react-redux";
import CollectionsOverviewContainer from "../../collections-overview/collections-overview.container";
import CollectionsPageContainer from "../collection-page/collection-page.container";

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  render() {
    const { match} = this.props;
    return (
      <div className="shop">
        <Route
          exact
          path={`${match.path}/:routeName`}
          component = {CollectionsPageContainer}
        />
        <Route
          exact
          path={`${match.path}`}
          component = {CollectionsOverviewContainer}
          
        />
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollections: () => dispatch(fetchCollections()),
  };
};

export default connect(null, mapDispatchToProps)(Shop);
