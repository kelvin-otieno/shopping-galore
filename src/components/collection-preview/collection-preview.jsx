import React from "react";
import CollectionItem from "../collection-item/collection-item";
import "./collection-preview.scss";

const CollectionPreview = ({ title, items }) => {
  return (
    <div className="main-div">
      <h1>{title.toUpperCase()}</h1>
      <div className="row">
        {items
          .filter((item, index) => index < 4)
          .map(({ id, ...otherProps }) => {
            return <CollectionItem key={id} {...otherProps} />;
          })}
      </div>
    </div>
  );
};

export default CollectionPreview;
