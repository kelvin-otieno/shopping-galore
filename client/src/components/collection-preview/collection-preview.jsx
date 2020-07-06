import React from "react";
import CollectionItem from "../collection-item/collection-item";
import "./collection-preview.scss";
import { withRouter, Link } from "react-router-dom";

const CollectionPreview = ({ title, items, routeName, match }) => {
  return (
    <div className="main-div">
      <Link to={`${match.path}/${routeName}`}><span className = "title">{title.toUpperCase()}</span></Link>{" "}
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

export default withRouter(CollectionPreview);
