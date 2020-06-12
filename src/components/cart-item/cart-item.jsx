import React from "react";
import "./cart-item.scss";
const CartItem = () => {
  return (
    <div>
      <div className="card horizontal card-img">
        <div className="card-image ">
          <img src={require("../../images/jackets.png")} alt = "img"/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>Shearling</p>

            <p>3 x $125</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
