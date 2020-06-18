const { cartActionTypes } = require("./cart.types");

const addToCart = (cartItem) => {
  return {
    type: cartActionTypes.ADD_TO_CART,
    payload: cartItem,
  };
};

const toggleDisplayCart = () => {
  return {
    type: cartActionTypes.TOGGLE_DISPLAY_CART,
  };
};

export { addToCart, toggleDisplayCart };
