import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  selectShop,
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  selectCollections,
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = (urlParam) =>
  createSelector(
    selectCollections,
    (collections) => {
      return collections[urlParam.routeName] }
  );

export const selectIsLoading = createSelector(
  selectShop,
  shop => shop.isLoading
)
export const selectIsCollectionLoading = createSelector(
  selectShop,
  shop => !Object.keys(shop.collections).length 
)