import React from "react";
import "./cart.scss";
import CartItem from "../cart-item/cart-item";
import { connect } from "react-redux";
import {
  selectCartItems,
  selectDisplayCart,
} from "../../redux/cart/cart.selectors";

const Cart = ({ cartItems, displayCart }) => {
  let display = "block";
  displayCart ? (display = "block") : (display = "none");
  return (
    <div className="center cart" style={{ display: `${display}` }}>
      <div>
        {cartItems.length ? (
          <ul className="cart-list">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id}>
                <CartItem {...cartItem} />
              </li>
            ))}
          </ul>
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>

      <button className="btn waves-effect  white black-text center checkout-btn ">
        GO TO CHECKOUT
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  displayCart: selectDisplayCart(state),
});

export default connect(mapStateToProps)(Cart);
