import React from "react";
import CollectionPreview from "../collection-preview/collection-preview";
import "./collections-overview.scss";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../redux/shop/shop.selectors";
import { connect } from "react-redux";

const CollectionsOverview = ({ shop }) => {
  return (
    <div>
      {shop.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  shop: selectCollections,
});

export default connect(mapStateToProps)(CollectionsOverview);
