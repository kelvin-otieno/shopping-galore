import React from "react";
import "./menu-item.scss";

export default function MenuItem({ title, imageUrl, size }) {
  return (
    <div>
      <div className={size === "large" ? "col s12 m6 l6" : "col s12 m6 l4"} style = {{overflow:"hidden"}}>
        <div
          className={"zoom menu-item valign-wrapper " + size}
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="description ">
            <h4 className="flow-text  title">{title.toUpperCase()}</h4>
            <p className="flow-text subtitle">SHOP NOW</p>
          </div>
        </div>
      </div>
    </div>
  );
}
