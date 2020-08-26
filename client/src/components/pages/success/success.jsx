import React, { Component } from "react";
import "./success.scss";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import {
  firestore,
  addCollectionAndDocuments,
} from "../../../firebase/firebase.utils";
import { selectCartItems } from "../../../redux/cart/cart.selectors";

class SuccessPage extends Component {
  async componentDidUpdate(nextProps) {
    const { currentUser, location } = this.props;

    const indexOfSessionId = location.search.indexOf("session_id")
    const indexOfMpesaRef = location.search.indexOf("mpesa_ref")
    // 
    // console.log(indexOfSessionId);
    // console.log(indexOfMpesaRef);
    if (currentUser && indexOfSessionId > -1) {
      const sessionId = location.search.replace("?session_id=", "");
      await fetch("/checkout-session?sessionId=" + sessionId)
        .then((res) => res.json())
        .then(async (session) => await this.saveStripeTransaction(session));
    } else if (currentUser && indexOfMpesaRef > -1) {
      const mpesaRef = location.search.replace("?mpesa_ref=", "");
      this.saveMPESATransaction(mpesaRef);
    }
  }

  saveStripeTransaction = async (session) => {
    try {
      if (session) {
        const items = session.display_items.map((item) => {
          return {
            name: item.custom.name,
            price: item.amount,
            quantity: item.quantity,
          };
        });
        const { currentUser } = this.props;
        const userDocRef = await firestore
          .collection("users")
          .doc(currentUser.id);
        const transactions = [
          {
            items,
            paymentInfo: {
              id: session.payment_intent,
              type: "Card",
            },
            timestamp: new Date(),
            user: userDocRef,
          },
        ];
        await addCollectionAndDocuments("transactions", transactions);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  saveMPESATransaction = async (mpesaRef) => {
    try {
      if (mpesaRef) {
        const { cartItems, currentUser } = this.props;
        const items = cartItems.map((item) => {
          return {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          };
        });
        const userDocRef = await firestore
          .collection("users")
          .doc(currentUser.id);
        const transactions = [
          {
            items,
            paymentInfo: {
              id: mpesaRef,
              type: "MPESA",
            },
            timestamp: new Date(),
            user: userDocRef,
          },
        ];
        await addCollectionAndDocuments("transactions", transactions);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <div className=" z-depth-4 container success">
        <div>
          <p className="success-message left">Payment was successful</p>
        </div>

        <div className="img-div">
          <img
            className=""
            src={require("../../../images/success_icon.svg")}
            alt=""
          />
        </div>

        <p className=" center">
          Kindly visit the <Link to="/history">history</Link> page to see a
          history of all transactions
        </p>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(SuccessPage);
