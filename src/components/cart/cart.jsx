import React from "react";
import "./cart.scss";
import CartItem from "../cart-item/cart-item";


const Cart = () => {
  return (
    <div className="center cart">
      <div>
        <ul className="cart-list">
          <li>
            <CartItem />
          </li>
          <li>
            <CartItem />
          </li>
          <li>
            <CartItem />
          </li>
          <li>
            <CartItem />
          </li>
        </ul>
      </div>

      <button className="btn waves-effect  white black-text center checkout-btn ">
        GO TO CHECKOUT
      </button>
      
    </div>
  );
};

export default Cart;
