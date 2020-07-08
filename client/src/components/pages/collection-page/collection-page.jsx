import React from "react";
import Collection from "../../collection/collection.jsx";
import { selectCollection } from "../../../redux/shop/shop.selectors.js";
import { connect } from "react-redux";
import "./collection-page.scss";

const CollectionPage = ({ collection }) => {
  return (
    <div className=" container-fluid">
      <div className = "row">

     <Collection title={collection.title} items={collection.items} />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params)(state),
});

export default connect(mapStateToProps)(CollectionPage);
