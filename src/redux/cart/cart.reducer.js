import { cartActionTypes } from "./cart.types";

const initialState = { cartItems: [], displayCart: false };
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_TO_CART:
      const searchCart = state.cartItems.filter((item) => {
        return item.id === action.payload.id;
      });
      if (searchCart.length === 0) {
        //item does not exist in the cart
        const newCartItem = {
          ...action.payload,
          quantity: 1,
        };
        let newState = state;
        newState.cartItems.push(newCartItem)
        return {
          ...state,
          cartItems:[...newState.cartItems]
        };
      } else {
        //item exists in the cart so get and add 1 to its quantity
        const itemIndex = state.cartItems
          .map((item) => item.id)
          .indexOf(action.payload.id);

        let newState = state;
        newState.cartItems[itemIndex].quantity += 1

        return {
          ...state,
          cartItems:[...newState.cartItems]
        };
      }

    case cartActionTypes.TOGGLE_DISPLAY_CART:
      return {
        ...state,
        displayCart: !state.displayCart,
      };
      
    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;
