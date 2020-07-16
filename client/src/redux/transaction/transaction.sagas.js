import { takeLatest, all, call, put } from "redux-saga/effects";
import { transactionActionTypes } from "./transaction.types";
import { firestore } from "../../firebase/firebase.utils";
import { loadUserTransactionsFailure, loadUserTransactionsSuccess } from "./transaction.actions";

function* onLoadUserTransactionsStart() {
  yield takeLatest(
    transactionActionTypes.LOAD_USER_TRANSACTIONS_START,
    loadUserTransactionsStart
  );
}

function* loadUserTransactionsStart({ payload: currentUser }) {
  try {
    const transactionsRef = yield firestore.collection("transactions");
    const userDocRef = yield firestore
      .collection("users")
      .doc(currentUser.id);
    const transactionsQuery = yield transactionsRef.where(
      "user",
      "==",
      userDocRef
    );
    const transactionsSnapshot = yield transactionsQuery.get();
    const transactions = [];
    transactionsSnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const id = doc.id;
      const data = doc.data();
      const transaction = {
        id,
        items: data.items,
        timestamp: data.timestamp,
        paymentInfo: data.paymentInfo,
      };
      transactions.push(transaction);
    });
    yield put(loadUserTransactionsSuccess(transactions))
  } catch (error) {
      yield put(loadUserTransactionsFailure(error.message))
  }
}

export function* transactionSagas() {
  yield all([call(onLoadUserTransactionsStart)]);
}
