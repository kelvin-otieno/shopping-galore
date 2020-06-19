import React from "react";
import "./shop.scss";
import CollectionsOverview from "../../collections-overview/collections-overview";
import { Route } from "react-router-dom";
import CollectionPage from "../collection-page/collection-page";

const Shop = ({ match }) => {
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
};

export default Shop;
