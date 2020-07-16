import { createSelector } from "reselect"

 const selectTransactions = (state) => state.transactions

 export const selectUserTransactions = createSelector(
     selectTransactions,
     (transactions) => transactions.userTransactions
 )

 export const selectUserTransactionsError = createSelector(
     selectTransactions,
     (transactions) => transactions.errorMessage
 )

