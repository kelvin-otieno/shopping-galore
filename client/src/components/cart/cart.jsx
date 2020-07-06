import React from "react";
import "./cart.scss";
import CartItem from "../cart-item/cart-item";
import { connect } from "react-redux";
import {
  selectCartItems,
  selectDisplayCart,
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { toggleDisplayCart } from "../../redux/cart/cart.actions";

const Cart = ({ cartItems, displayCart, history,dispatch }) => {
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

      <button
        className="btn waves-effect  white black-text center checkout-btn "
        onClick={() => {
          dispatch(toggleDisplayCart())
          history.push("/checkout")}}
      >
        GO TO CHECKOUT
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  displayCart: selectDisplayCart,
});

// const mapDispatchToProps = (dispatch) => (
//   {
//     toggleDisplayCart:() => dispatch(toggleDisplayCart())
//   }
// )

export default withRouter(connect(mapStateToProps)(Cart));
