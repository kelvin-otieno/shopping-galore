const { cartActionTypes } = require("./cart.types");

const addToCart = (cartItem) => {
  return {
    type: cartActionTypes.ADD_TO_CART,
    payload: cartItem,
  };
};

export { addToCart };
