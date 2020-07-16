import { takeLatest, all, call, put } from "redux-saga/effects";
import { userActionTypes } from "./user.types";
import {
  signInWithGoogle,
  createUserProfileDocument,
  auth,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
  signUpSuccess,
} from "./user.action";

function* getSnapshotAndSignInUser(user,additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, user,additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* googleSignInStart() {
  try {
    const { user } = yield signInWithGoogle();
    yield getSnapshotAndSignInUser(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignInStart);
}

function* emailSignInStart({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotAndSignInUser(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, emailSignInStart);
}

function* checkUserSession() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotAndSignInUser(userAuth);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, checkUserSession);
}

function* signOutStart() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOutStart);
}

function* signUpStart({payload:{ displayName, email, password,phoneNumber }}) {
  try {
      const { user } = yield auth.createUserWithEmailAndPassword(email, password);
      yield put(signUpSuccess({user,additionalData:{displayName,phoneNumber}}))
      
  } catch (error) {
      yield put(signUpFailure(error.message))
  }  

}

function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUpStart);
}


function* signInAfterSignUp({payload:{user,additionalData}}){
    try {
      yield  getSnapshotAndSignInUser(user,additionalData)
    } catch (error) {
        yield signInFailure(error.message)
    }
}

function* onSignUpSuccess(){
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS,signInAfterSignUp)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
