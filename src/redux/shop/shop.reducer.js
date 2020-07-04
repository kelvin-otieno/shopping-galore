import { shopActionTypes } from "./shop.types";

const INITIAL_STATE = { collections: {}, isLoading: false,errorMessage:"" };

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case shopActionTypes.UPDATE_COLLECTIONS: {
      return {
        ...state,
        collections: action.payload,
      };
    }
    case shopActionTypes.FETCH_COLLECTIONS_START: {
      console.log("started fetching");
      return {
        ...state,
        isLoading: true,
      };
    }
    case shopActionTypes.FETCH_COLLECTIONS_SUCCESS: {
      return {
        ...state,
        collections: action.payload,
        isLoading: false,
      };
    }
    case shopActionTypes.FETCH_COLLECTIONS_ERROR: {
      return {
        ...state,
        errorMessage:action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default shopReducer;
