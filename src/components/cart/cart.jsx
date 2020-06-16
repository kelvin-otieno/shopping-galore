import React from "react";
import "./cart.scss";
import CartItem from "../cart-item/cart-item";
import { connect } from "react-redux";

const Cart = ({ cart }) => {
  return (
    <div className="center cart">
      <div>
        <ul className="cart-list">
          {cart.cart
            ? cart.cart.map((cartItem) => (
                <li key={cartItem.id}>
                  <CartItem  {...cartItem} />
                </li>
              ))
            : null}
        </ul>
      </div>

      <button className="btn waves-effect  white black-text center checkout-btn ">
        GO TO CHECKOUT
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);
