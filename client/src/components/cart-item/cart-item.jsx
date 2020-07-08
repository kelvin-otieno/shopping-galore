import React from "react";
import "./cart-item.scss";
const CartItem = ({ imageUrl, price, quantity, name }) => {
  return (
    <div className = "cart-item">
      <div className="card horizontal card-img">
        <div className="card-image " >
          <img src={imageUrl} alt="img" />
    
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{name}</p>

            <p>{`${quantity} x KES ${price}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
