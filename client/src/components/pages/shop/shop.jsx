import React, { Component, Suspense } from "react";
import "./shop.scss";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../../redux/shop/shop.actions";
import { lazy } from "react";
import Spinner from "../../spinner/spinner.component";

const CollectionsOverviewContainer = lazy(() =>
  import("../../collections-overview/collections-overview.container")
);
const CollectionsPageContainer = lazy(() =>
  import("../collection-page/collection-page.container")
);

class Shop extends Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop">
        <Suspense fallback={<Spinner />}>
          <Route
            exact
            path={`${match.path}/:routeName`}
            component={CollectionsPageContainer}
          />
          <Route
            exact
            path={`${match.path}`}
            component={CollectionsOverviewContainer}
          />
        </Suspense>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  };
};

export default connect(null, mapDispatchToProps)(Shop);
