const initialState = null;

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
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
