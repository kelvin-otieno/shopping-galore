import React from "react";
import CollectionItem from "../collection-item/collection-item";
import "./collection.scss";

const Collection = ({ title, items }) => {
  return (
    <div className="main-div">
      <h2 className = "title center">{title}</h2>
      <div className="row">
        {items
          .map(({ id, ...otherProps }) => {
            return <CollectionItem key={id} id={id} {...otherProps} />;
          })}
      </div>
    </div>
  );
};

export default Collection;