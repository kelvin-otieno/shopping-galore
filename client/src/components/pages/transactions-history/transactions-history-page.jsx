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
import { CollapsibleItem, Collapsible, Icon } from "react-materialize";

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
        <Collapsible accordion>
          {transactions.map((transaction) => {
            let totalPrice = 0;
            let convPrice = 0; //we need to check if payment is via mpesa or stripe since stripe stores in cents while mpesa stores in ksh
            return (
              <CollapsibleItem
                key={transaction.id}
                expanded={false}
                header={transaction.timestamp.toDate().toString()}
                icon={<Icon>whatshot</Icon>}
                node="div"
              >
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
                      transaction.paymentInfo.type === "MPESA" ? convPrice = price : convPrice = price / 100
                      totalPrice += (convPrice) * quantity;
                      return (
                        <tr key={name}>
                          <td>{name}</td>
                          <td>
                            <div>
                              <span className="count">{quantity}</span>
                            </div>
                          </td>
                          <td>{`KES ${convPrice}`}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="bottom-div">
                  <div>
                    <span className="right">{`TOTAL : KES ${totalPrice}`}</span>
                    <span className="left">{transaction.paymentInfo.type}</span>
                  </div>
                </div>
              </CollapsibleItem>
            );
          })}
        </Collapsible>
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
