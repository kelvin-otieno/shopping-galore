import { transactionActionTypes } from "./transaction.types";

const initialState = {userTransactions:[]}
export const transactionReducer = (state=initialState,action) => {
    switch (action.type) {
        case transactionActionTypes.LOAD_USER_TRANSACTIONS_START:
            return {
                ...state,
            }
        case transactionActionTypes.LOAD_USER_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                userTransactions:action.payload
            }
        case transactionActionTypes.LOAD_USER_TRANSACTIONS_FAILURE:
            return {
                ...state,
                errorMessage:action.payload
            }
    
        default:
            return state
    }
}