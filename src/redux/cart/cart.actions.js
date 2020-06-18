const { cartActionTypes } = require("./cart.types");

const addToCart = (cartItem) => {
  return {
    type: cartActionTypes.ADD_TO_CART,
    payload: cartItem,
  };
};

const removeFromCart = (id) => {
  return {
    type: cartActionTypes.REMOVE_FROM_CART,
    payload: id,
  };
};

const increaseCartQuantity = (id) => {
  return {
    type: cartActionTypes.INCREASE_CART_QUANTITY,
    payload: id,
  };
};

const decreaseCartQuantity = (id) => {
  return {
    type: cartActionTypes.DECREASE_CART_QUANTITY,
    payload: id,
  };
};

const toggleDisplayCart = () => {
  return {
    type: cartActionTypes.TOGGLE_DISPLAY_CART,
  };
};

export {
  addToCart,
  toggleDisplayCart,
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
};
