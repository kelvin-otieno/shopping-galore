import React from "react";
import Collection from "../../collection/collection.jsx";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../../redux/shop/shop.selectors.js";
import { connect } from "react-redux";
import './collection-page.scss'

const CollectionPage = ({ match, collections }) => {
  console.log(match);
  const collection = collections.filter(
    (item) => item.title.toLowerCase() === match.params.categoryId
  );
  return (
    <div className="category">
      <Collection title={collection[0].title} items={collection[0].items} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(CollectionPage);
