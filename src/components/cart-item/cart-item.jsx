import React from "react";
import "./cart-item.scss";
const CartItem = ({ imageUrl, price, quantity, name }) => {
  return (
    <div>
      <div className="card horizontal card-img">
        <div className="card-image " >
          <img src={require("../../images/jackets.png")} alt="img" />
    
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{name}</p>

            <p>{`${quantity} x ${price}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
