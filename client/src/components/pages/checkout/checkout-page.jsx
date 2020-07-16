import React from "react";
import "./checkout-page.scss";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import {
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
} from "../../../redux/cart/cart.actions";
import StripeCheckoutButton from "../../stripe-button/stripe-button";

const CheckoutPage = ({
  cartItems,
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  totalPrice,
}) => {
  return (
    <div className="container checkout-page">
      <h6 className="header">CHECKOUT PAGE</h6>
      <table className="responsive-table centered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map(({ id, imageUrl, quantity, price, name }) => (
            <tr key={id}>
              <td>
                <img src={`${imageUrl}`} alt="" />
              </td>
              <td>{name}</td>
              <td>
                <div>
                  <span
                    className="alter-count"
                    onClick={() => decreaseCartQuantity(id)}
                  >
                    &lt;
                  </span>
                  <span className="count">{quantity}</span>
                  <span
                    className="alter-count"
                    onClick={() => increaseCartQuantity(id)}
                  >
                    &gt;
                  </span>
                </div>
              </td>
              <td>{`KES ${price}`}</td>
              <td>
                <span
                  className="remove-item"
                  onClick={() => removeFromCart(id)}
                >
                  &#10005;
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bottom-div">
        <div className="total-price">
          <span>{`TOTAL : KES ${totalPrice}`}</span>
        </div>
        <div className="center red-text flow-text">
          <span>*Please use the following test credit card for payments*</span>
          <br />
          <span>4242 4242 4242 4242 - CVC:123</span>
        </div>
      </div>
      <div className="payment-btn right">
        <StripeCheckoutButton />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalPrice: selectCartTotalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (id) => dispatch(removeFromCart(id)),
  increaseCartQuantity: (id) => dispatch(increaseCartQuantity(id)),
  decreaseCartQuantity: (id) => dispatch(decreaseCartQuantity(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
