import { userActionTypes } from "./user.types";

const googleSignInStart = () => ({
  type: userActionTypes.GOOGLE_SIGN_IN_START,
});
const signInSuccess = (user) => ({
  type: userActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});
const signInFailure = (errorMessage) => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: errorMessage,
});

const emailSignInStart = (EmailAndPassword) => ({
  type: userActionTypes.EMAIL_SIGN_IN_START,
  payload: EmailAndPassword,
});

const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
});

const signOutStart = () => ({
  type: userActionTypes.SIGN_OUT_START,
});
const signOutSuccess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS,
});
const signOutFailure = (error) => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});
const signUpStart = (signUpInfo) => ({
  type: userActionTypes.SIGN_UP_START,
  payload: signUpInfo,
});
const signUpSuccess = ({user,additionalData}) => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload:{user,additionalData}
});
const signUpFailure = (error) => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
const clearUserError = () => ({
  type: userActionTypes.CLEAR_USER_ERROR
})

export {
  googleSignInStart,
  signInSuccess,
  signInFailure,
  emailSignInStart,
  checkUserSession,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpStart,
  signUpFailure,
  clearUserError
};
