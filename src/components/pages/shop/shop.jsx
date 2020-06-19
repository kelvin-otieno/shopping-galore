import React from "react";
import CollectionPreview from "../../collection-preview/collection-preview";
import "./shop.scss";
import { createStructuredSelector } from "reselect";
import { selectShopData } from "../../../redux/shop/shop.selectors";
import { connect } from "react-redux";

const Shop = ({ shop }) => {
  return (
    <div className="shop">
      {/* <h3>Collections</h3> */}
      {shop.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  shop: selectShopData,
});

export default connect(mapStateToProps)(Shop);
