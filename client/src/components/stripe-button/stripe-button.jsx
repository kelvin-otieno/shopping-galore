import React from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";

const StripeCheckoutButton = ({ cartItems }) => {
  const publishableKey =
    "pk_test_51Gvp7tESfqGwrq2BVRpAVnDdOfTqRLCMsDWQDrwuvGKETsGWE4048qKel1oMyZrnKmszsuNj27lfjpUtciGMBQCa00AKfiS5AF";

  const stripePromise = loadStripe(publishableKey);
  const handleClick = async (event) => {
    // Call your backend to create the Checkout Session
    let success_url = "";
    let cancel_url = "";
    if (process.env.NODE_ENV === "development") {
      success_url = "http://localhost:3000/success";
      cancel_url = "http://localhost:3000/checkout";
    } else {
      success_url = "https://shop-onclick.herokuapp/success";
      cancel_url = "https://shop-onclick.herokuapp/checkout";
    }
    try {
      axios({
        url: "stripe-payment",
        method: "post",
        data: {
          cartItems,
          success_url,
          cancel_url,
        },
      }).then(async (res) => {
        const { session_id, error } = res.data;
        if (error) {
          alert(error.message);
          return;
        }
        const stripe = await stripePromise;

        await stripe.redirectToCheckout({
          sessionId: session_id,
        });

        await stripe.confirmCardPayment(publishableKey);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button className="btn blue" onClick={(e) => handleClick(e)}>
      <i className="material-icons right">credit_card</i>Pay with
    </button>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(StripeCheckoutButton);
