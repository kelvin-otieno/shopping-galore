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
        newState.cartItems.push(newCartItem);
        return {
          ...state,
          cartItems: [...newState.cartItems],
        };
      } else {
        //item exists in the cart so get and add 1 to its quantity
        const itemIndex = state.cartItems
          .map((item) => item.id)
          .indexOf(action.payload.id);

        let newState = state;
        newState.cartItems[itemIndex].quantity += 1;

        return {
          ...state,
          cartItems: [...newState.cartItems],
        };
      }

    case cartActionTypes.REMOVE_FROM_CART:
      const remFilter = state.cartItems.filter((item) => {
        return item.id === action.payload;
      });
      if (remFilter.length === 0) {
        //item does not exist in the cart.return state as is

        return {
          ...state,
        };
      } else {
        //item exists in the cart so get and remove it
        const itemIndex = state.cartItems
          .map((item) => item.id)
          .indexOf(action.payload);

        let newCartItems = state.cartItems;
        newCartItems.splice(itemIndex, 1);

        return {
          ...state,
          cartItems: [...newCartItems],
        };
      }

    case cartActionTypes.INCREASE_CART_QUANTITY:
      const incFilter = state.cartItems.filter((item) => {
        return item.id === action.payload;
      });
      if (incFilter.length === 0) {
        //item does not exist in the cart. return state as is

        return {
          ...state,
        };
      } else {
        //item exists in the cart so get and add 1 to its quantity
        const itemIndex = state.cartItems
          .map((item) => item.id)
          .indexOf(action.payload);

        let newCartItems = state.cartItems;
        newCartItems[itemIndex].quantity += 1;

        return {
          ...state,
          cartItems: [...newCartItems],
        };
      }

    case cartActionTypes.DECREASE_CART_QUANTITY:
      const decFilter = state.cartItems.filter((item) => {
        return item.id === action.payload;
      });
      if (decFilter.length === 0) {
        //item does not exist in the cart. return state as is

        return {
          ...state,
        };
      } else {
        //item exists in the cart so get and remove 1 from its quantity
        const itemIndex = state.cartItems
          .map((item) => item.id)
          .indexOf(action.payload);

        let newCartItems = state.cartItems;
        newCartItems[itemIndex].quantity -= 1;

        if (!newCartItems[itemIndex].quantity) {
          newCartItems.splice(itemIndex, 1);
        }
        return {
          ...state,
          cartItems: [...newCartItems],
        };
      }

    case cartActionTypes.TOGGLE_DISPLAY_CART:
      return {
        ...state,
        displayCart: !state.displayCart,
      };

      case cartActionTypes.CLEAR_CART:
        return{
          ...state,
          cartItems:[]
        }

    default:
      return state;
  }
};

export default cartReducer;
