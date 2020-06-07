import React from "react";
import "./collection-item.scss";

const CollectionItem = ({ name, price, imageUrl }) => {
  return (
    <div>
      <div className="collection-item col s12 m6 l3">
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
            height: "350px",
          }}
          className="valign-wrapper image"
        >
          <button className="btn waves-effect waves-red grey add-button">
            ADD TO CART
          </button>
        </div>

        <div>
        <span className="left hoverable name">{name}</span>
          <span className="right price hoverable">{`${"$"}${price}`}</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
