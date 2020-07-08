import React from "react";
import "./cart-icon.scss";
import { ReactComponent as ShoppingIcon } from "../../images/shopping-bag.svg";
import { connect } from "react-redux";
import { toggleDisplayCart } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CartIcon = ({ itemCount, toggleDisplayCart }) => {
  return (
    <div className="cart-icon" onClick={() => toggleDisplayCart()}>
      <ShoppingIcon className="shopping-icon ">
        
      </ShoppingIcon>
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleDisplayCart: () => dispatch(toggleDisplayCart()),
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
