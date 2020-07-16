import React, { Component } from "react";
import "./transactions-history-page.scss";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import {
  selectUserTransactions,
  selectUserTransactionsError,
} from "../../../redux/transaction/transaction.selectors";
import { loadUserTransactionsStart } from "../../../redux/transaction/transaction.actions";

class TransactionsHistoryPage extends Component {
  // constructor(props){
  //   super(props)

  //   // this.state = {
  //   //   transactions : props.transactions,
  //   //   errorMessage: props.errorMessage
  //   // }
  // }

  componentDidMount() {
    const { currentUser, loadUserTransactionsStart } = this.props;
    loadUserTransactionsStart(currentUser);
  }

  componentDidUpdate(nextProps) {
    const { currentUser, loadUserTransactionsStart } = this.props;
    if (nextProps.currentUser !== currentUser) {
      if (currentUser) {
        loadUserTransactionsStart(currentUser);
      }
    }
  }

  render() {
    const { transactions } = this.props;

    return (
      <div className="container checkout-page">
        <h6 className="header">TRANSACTIONS HISTORY</h6>

        <ul className="collapsible">
          {transactions.map((transaction) => {
            let totalPrice = 0;
            return (
              <li key={transaction.id}>
                <div className="collapsible-header">
                  <i className="material-icons">alarm</i>
                  {transaction.timestamp.toDate().toString()}
                </div>
                <div className="collapsible-body">
                  <table className="responsive-table centered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>

                    <tbody>
                      {transaction.items.map(({ quantity, price, name }) => {
                        totalPrice += (price / 100) * quantity;
                        return (
                          <tr key={name}>
                            <td>{name}</td>
                            <td>
                              <div>
                                <span className="count">{quantity}</span>
                              </div>
                            </td>
                            <td>{`KES ${price / 100}`}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="bottom-div">
                    <div>
                      <span className="right">{`TOTAL : KES ${totalPrice}`}</span>
                      <span className="left">
                        {transaction.paymentInfo.type}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <span className="red-text">
          Kindly refresh page (CTRL + R) if you are unable expand the
          transactions.
        </span>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  transactions: selectUserTransactions,
  currentUser: selectCurrentUser,
  errorMessage: selectUserTransactionsError,
});

const mapDispatchToProps = (dispatch) => ({
  loadUserTransactionsStart: (currentUser) =>
    dispatch(loadUserTransactionsStart(currentUser)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsHistoryPage);
