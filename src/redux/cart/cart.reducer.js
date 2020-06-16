import { cartActionTypes } from "./cart.types";

const initialState = null;
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_TO_CART:
      if (state.hasOwnProperty("cart")) {
        //check if cart key exists
        const searchCart = state.cart.filter((item) => {
          return item.id === action.payload.id;
        });
        if (searchCart.length === 0) {
          //item does not exist in the cart
          const newCartItem = {
            ...action.payload,
            quantity: 1,
          };
          state.cart.push(newCartItem);
          return {
            ...state,
          };
        } else {
          //item exists in the cart so get and add 1 to its quantity
          const itemIndex = state.cart
            .map((item) => item.id)
            .indexOf(action.payload.id);

          state.cart[itemIndex].quantity += 1;

          return {
            ...state,
          };
        }
      } else {
        //state has no cart key so add cart and the first item to it

        return {
          ...state,
          cart: [
            {
              ...action.payload,
              quantity: 1,
            },
          ],
        };
      }

    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;
