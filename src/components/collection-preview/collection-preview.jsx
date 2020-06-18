import React from "react";
import CollectionItem from "../collection-item/collection-item";
import "./collection-preview.scss";

const CollectionPreview = ({ title, items }) => {
  return (
    <div className="main-div">
      <h4 className = "title">{title.toUpperCase()}</h4>
      <div className="row">
        {items
          .filter((item, index) => index < 4)
          .map(({ id, ...otherProps }) => {
            return <CollectionItem key={id} id={id} {...otherProps} />;
          })}
      </div>
    </div>
  );
};

export default CollectionPreview;
