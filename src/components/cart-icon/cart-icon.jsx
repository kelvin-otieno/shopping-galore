import React from "react";
import "./cart-icon.scss";
import { ReactComponent as ShoppingIcon } from "../../images/shopping-bag.svg";
import { connect } from "react-redux";

const CartIcon = ({ cart }) => {
  let totalQuantity = 0;

  if (cart.cart) {
    cart.cart.map((cartItem) => (totalQuantity += cartItem.quantity));
  }
  return (
    <div className="cart-icon">
      <ShoppingIcon className="shopping-icon "></ShoppingIcon>
      <span className="item-count">{totalQuantity}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
export default connect(mapStateToProps)(CartIcon);
