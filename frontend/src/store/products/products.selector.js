import { createSelector } from "reselect";

export const selectProductsReducer = (state) => state.products;
export const selectProductReducer = (state) => state.product;

export const selectProducts = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.products
);
export const selectIsLoading = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.loading
);
export const selectError = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.error
);
