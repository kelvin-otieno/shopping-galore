import { transactionActionTypes } from "./transaction.types";


export const loadUserTransactionsStart = (currentUser) => ({
  type: transactionActionTypes.LOAD_USER_TRANSACTIONS_START,
  payload: currentUser
});

export const loadUserTransactionsSuccess = (transactions) => ({
  type: transactionActionTypes.LOAD_USER_TRANSACTIONS_SUCCESS,
  payload: transactions
});

export const loadUserTransactionsFailure = (errorMessage) => ({
  type: transactionActionTypes.LOAD_USER_TRANSACTIONS_FAILURE,
  payload: errorMessage
});
