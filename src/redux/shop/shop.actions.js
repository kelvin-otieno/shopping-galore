const { shopActionTypes } = require("./shop.types");

const updateCollections = (collections) => {
  return {
    type: shopActionTypes.UPDATE_COLLECTIONS,
    payload: collections,
  };
};

export { updateCollections };
