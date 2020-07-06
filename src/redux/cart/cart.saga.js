const { all, call, put, takeLatest } = require("redux-saga/effects");
const { userActionTypes } = require("../user/user.types");
const { clearCart } = require("./cart.actions");

function* clearCartOnSignOut() {
  yield put(clearCart());
}

function* onSignOutSuccess() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}

export { cartSagas };
