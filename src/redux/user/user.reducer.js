import { userActionTypes } from "./user.types";

const initialState = null;

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...prevState,
        currentUser: action.payload,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default userReducer;
