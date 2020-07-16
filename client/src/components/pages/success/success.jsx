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

class SuccessPage extends Component {
  async componentDidUpdate(nextProps) {
    const { currentUser, location} = this.props;

    const sessionId = location.search.replace("?session_id=", "");
    if (currentUser && sessionId) {
      await fetch("/checkout-session?sessionId=" + sessionId)
        .then((res) => res.json())
        .then(async (session) => await this.saveTransaction(session));
    }
    
  }

  saveTransaction = async (session) => {
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
              type: "Visa credit card",
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
});

export default connect(mapStateToProps)(SuccessPage);
