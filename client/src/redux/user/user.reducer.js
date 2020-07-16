import { userActionTypes } from "./user.types";

const initialState = { currentUser: null, error: "" };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: "",
      };
    case userActionTypes.SIGN_IN_FAILURE:
      case userActionTypes.SIGN_OUT_FAILURE:
        case userActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error:null
      };

      case userActionTypes.CLEAR_USER_ERROR:
        return {
          ...state,
          error : null
        }

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
